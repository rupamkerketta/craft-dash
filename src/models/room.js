const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
	roomId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		unique: true
	},

	users: [
		{
			username: {
				type: String,
				required: true
			},
			email: {
				type: String,
				required: true
			},
			socketId: {
				type: String,
				required: true
			}
		}
	]
})

roomSchema.statics.joinRoom = async (roomId, username, email, socketId) => {
	console.log(`[roomSchema.statics.joinRoom]`)
	// Find the room if it does not exist create one
	const socketRoom = await Room.findOne({ roomId })

	// Create a 'room' if it does not exists
	if (!socketRoom) {
		console.log('[Creating a new room cause it does not exists]')
		const room = new Room({
			roomId
		})

		await room.save()

		// Add the first user trying to connect to the room
		room.users = room.users.concat({
			username,
			email,
			socketId
		})
		const result = await room.save()
		return result
	}

	// If the room already exists
	const userAlreadyPresent = () => {
		return new Promise((resolve, reject) => {
			Room.findOne({ 'users.email': email }, (err, doc) => {
				if (err) {
					reject(err)
					return
				}

				if (!doc) {
					resolve({ flag: false, index: -1 })
				}

				if (doc) {
					let index = doc.users.findIndex((user) => user.email === email)
					resolve({ flag: true, index })
				}
			})
		})
	}

	const status = await userAlreadyPresent()

	if (!status.flag && status.index === -1) {
		// When the user is not present in the room
		socketRoom.users = socketRoom.users.concat({
			username,
			email,
			socketId
		})
		await socketRoom.save()
		return socketRoom
	} else {
		// When the user is already present in the room
		// Just update the socket id
		socketRoom.users[status.index].socketId = socketId
		await socketRoom.save()
		return socketRoom
	}
}

roomSchema.statics.userLeaves = async (socketId) => {
	const socketRoom = await Room.findOne({ 'users.socketId': socketId })

	if (!socketRoom) {
		return
	}

	const user = socketRoom.users.find((user) => user.socketId === socketId)

	socketRoom.users = socketRoom.users.filter(
		(user) => user.socketId !== socketId
	)

	console.log(socketRoom.users)
	await socketRoom.save()

	// Send the user data
	return {
		id: user.socketId,
		username: user.username,
		email: user.email,
		room: socketRoom.roomId
	}
}

const Room = mongoose.model('Room', roomSchema)
module.exports = Room
