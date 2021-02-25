// Room model
const Room = require('../models/room')

const chat = require('./chat/chat')
const nodes = require('./nodes/nodes')
const mousePointer = require('./mouse-pointer/mouse-pointer')
const { video, cleanRoom } = require('./video/video')

const socketModule = (socket, io) => {
	// Socket Connection
	socket.on('joinRoom', async ({ username, email, room }) => {
		console.log(`[joinRoom]`)
		// Idea Board Room
		const idbr = await Room.joinRoom(room, username, email, socket.id)

		const roomId = idbr.roomId
		const user = idbr.users.find((user) => user.email === email)

		const usersInRoom = idbr.users.map((user) => {
			return {
				id: user.socketId,
				username: user.username,
				email: user.email,
				room: roomId
			}
		})

		// Add the user to the room
		socket.join(roomId)

		// Sends back the 'room - id' on a successful connection
		socket.emit('successful-connection', { roomId })

		// Sends back the users who are already present in the room
		socket.emit('room-users', { users: usersInRoom })

		// Broadcasts the info of user who just joined the room to other
		// users who are already present in the room
		const userData = {
			id: user.socketId,
			username: user.username,
			email: user.email,
			room: roomId
		}
		socket.broadcast.to(roomId).emit('user-connected', userData)
	})

	// Socket Disconnection
	socket.on('disconnect', async () => {
		const user = await Room.userLeaves(socket.id)

		if (user) {
			socket.broadcast.to(user.room).emit('user-disconnected', user)
			socket.broadcast
				.to(user.room)
				.emit('user-disconnected-video', { userId: socket.id })
			cleanRoom(socket.id)
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
