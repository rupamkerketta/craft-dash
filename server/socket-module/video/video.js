let users = {}
let socketToRoom = {}

const video = (socket, io) => {
	// Video Operations

	socket.on('join-room', (data) => {
		// console.log(`[video-join-room] ${JSON.stringify(users)}`)
		// This is for when a room already exists in the users object
		// and a new user tries to join the room
		if (users[data.roomId]) {
			// For getting the total no. of users in the room
			const length = users[data.roomId].length
			// Limiting the total no. of users in a room to 4
			if (length === 4) {
				// if()
				socket.emit('room-full')
				return
			}
			// If the limit is not reached then add a user to the room
			users[data.roomId].push({ socketId: socket.id, username: data.username })
		} else {
			// This is for when a user is the first one to join the room
			users[data.roomId] = [{ socketId: socket.id, username: data.username }]
			// users : Representation of the data structure
			// {
			//     roomId: [socket.id1, socket.id2, socket.id3, ...]
			// }
		}

		socketToRoom[socket.id] = data.roomId
		// socketToRoom : Representation of the data structure
		// {
		//     socket.id1 : roomId1
		//     socket.id2 : roomId1
		//     socket.id3 : roomId2
		//      .
		//      .
		//      .
		// }

		socket.join(data.roomId)

		// Return a list of all user who are already in the room
		const usersInThisRoom = users[data.roomId].filter(
			(user) => user.socketId !== socket.id
		)

		// console.log(`[usersInThisRoom on join] ${JSON.stringify(users)}`)

		// Socket emit the user list
		socket.emit('all-users', { usersInThisRoom })
	})

	// Signalling - actions SEND and RECEIVE

	// SEND - When a user sends a signal for the HAND-SHAKE
	socket.on('sending-signal', (data) => {
		io.to(data.userToSignal).emit('user-joined', {
			signal: data.signal,
			callerId: data.callerId,
			username: data.username
		})
	})

	// RECEIVE
	socket.on('returning-signal', (data) => {
		io.to(data.callerId).emit('receiving-returned-signal', {
			signal: data.signal,
			id: socket.id,
			username: data.username
		})
	})
}

const cleanRoom = (socketId, io) => {
	const roomId = socketToRoom[socketId]
	delete socketToRoom[socketId]

	// Room Cleanup
	if (users[roomId] !== undefined && users[roomId].length === 0) {
		delete users[roomId]
	} else {
		users[roomId] = users[roomId].filter((user) => user.socketId !== socketId)
		// console.log(`[cleanRoom (video)] ${JSON.stringify(users[roomId])}`)
	}
}

module.exports = { video, cleanRoom }
