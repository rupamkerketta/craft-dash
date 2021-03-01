// Room model
// const Room = require('../models/room')

let users = {}
let socketToRoom = {}

const chat = require('./chat/chat')
const nodes = require('./nodes/nodes')
const mousePointer = require('./mouse-pointer/mouse-pointer')
const { video, cleanRoom: cleanVideoRoom } = require('./video/video')

const socketModule = (socket, io) => {
	// Socket Connection
	socket.on('joinRoom', async ({ username, user_email, room }) => {
		// console.log(`[joinRoom] ${username}, ${user_email}, ${room}`)

		// This is for when a room already exists in the users object
		// and a new user tries to join the room
		if (users[room]) {
			// For getting the total no. of users in the room
			const length = users[room].length
			// Limiting the total no. of users in a room to 4
			if (length === 4) {
				// if()
				socket.emit('room-full')
				return
			}
			// If the limit is not reached then add a user to the room
			users[room].push({
				socketId: socket.id,
				username,
				email: user_email,
				room
			})
		} else {
			// This is for when a user is the first one to join the room
			users[room] = [
				{
					socketId: socket.id,
					username,
					email: user_email,
					room
				}
			]
			// users : Representation of the data structure
			// {
			//     roomId: [socket.id1, socket.id2, socket.id3, ...]
			// }
		}

		socketToRoom[socket.id] = room
		// socketToRoom : Representation of the data structure
		// {
		//     socket.id1 : roomId1
		//     socket.id2 : roomId1
		//     socket.id3 : roomId2
		//      .
		//      .
		//      .
		// }

		// Add the user to the room
		socket.join(room)

		// Sends back the 'room - id' on a successful connection
		socket.emit('successful-connection', { room })

		// Return a list of all user who are already in the room
		const usersInThisRoom = users[room].filter(
			(user) => user.socketId !== socket.id
		)

		// console.log(`[usersInThisRoom (main)] ${usersInThisRoom}`)

		// Sends back the users who are already present in the room
		socket.emit('room-users', { users: usersInThisRoom })

		// Broadcasts the info of the user who just joined the room to other
		// users who are already present in the room
		const userData = {
			id: socket.id,
			username,
			email: user_email,
			room
		}
		socket.broadcast.to(room).emit('user-connected', userData)
	})

	// Socket Disconnection
	socket.on('disconnect', async () => {
		try {
			const user_list = users[socketToRoom[socket.id]]

			if (typeof user_list !== 'undefined') {
				const user = user_list.find((user) => user.socketId === socket.id)

				// console.log(`[disconnect] ${JSON.stringify(user_list)}`)

				if (user) {
					socket.broadcast.to(user.room).emit('user-disconnected', user)

					socket.broadcast
						.to(user.room)
						.emit('user-disconnected-video', { userId: socket.id })

					const roomId = socketToRoom[socket.id]
					delete socketToRoom[socket.id]

					// Room Cleanup - Main
					if (users[roomId] !== undefined && users[roomId].length === 0) {
						delete users[roomId]
					} else {
						users[roomId] = users[roomId].filter(
							(user) => user.socketId !== socket.id
						)
						// console.log(`[cleanRoom (main)] ${JSON.stringify(users[roomId])}`)
					}

					cleanVideoRoom(socket.id, io)
				}
			}
		} catch (err) {
			console.log(err)
		}
	})

	// Chat Messages
	chat(socket, io)

	// Nodes
	nodes(socket)

	// webRTC video & audio
	video(socket, io)

	// Mouse Pointer
	mousePointer(socket)
}

module.exports = socketModule
