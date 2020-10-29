// Environment Variables Configuration
const result = require('dotenv').config()

if (result.error) {
	console.log(result.error)
}

const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

const moment = require('moment')
const socketio = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = socketio(server)
const {
	userJoin,
	getCurrentUser,
	userLeaves,
	getRoomUsers
} = require('./chat-module/user')

// mongoDB Connection Module
require('./db/mongoose')

const origin =
	process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'

const corsOptions = {
	origin: origin,
	credentials: true
}

const PORT = process.env.PORT || 5000

// Routers
const usersRouter = require('./routes/users')
const ideaBoardRouter = require('./routes/idea-board')
const collaboratorsRouter = require('./routes/collaborators')
const mongoose = require('./db/mongoose')

// Middlewares
app.use(express.json(), cookieParser(), cors(corsOptions))
app.use('/api/user', usersRouter)
app.use('/api/idea-board', ideaBoardRouter)
app.use('/api/collaborators', collaboratorsRouter)

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('../client/build'))

	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../', 'client', 'build', 'index.html')
		)
	})
}

const users = {}
const socketToRoom = {}

mongoose.connect(() => {
	server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

	io.on('connection', (socket) => {
		socket.on('joinRoom', ({ username, email, room }) => {
			const user = userJoin(socket.id, username, email, room)

			socket.join(user.room)

			socket.emit('successful-connection', { room })

			socket.emit('room-users', { users: getRoomUsers(room) })
			socket.broadcast.to(user.room).emit('user-connected', user)
		})

		socket.on('disconnect', () => {
			const user = userLeaves(socket.id)

			if (user) {
				socket.broadcast.to(user.room).emit('user-disconnected', user)
			}

			const roomId = socketToRoom[socket.id]
			console.log(
				`[server] socket-disconnect : ${socket.id}, roomId: ${roomId}`
			)

			io.to(roomId).emit('user-disconnected-video', { userId: socket.id })

			let room = users[roomId]
			if (room) {
				room = room.filter((id) => id !== socket.id)
				users[roomId] = room
			}
		})

		// Listen for chat message
		socket.on('chat-message', (message) => {
			try {
				const user = getCurrentUser(socket.id)
				io.to(user.room).emit('chat-message', {
					username: user.username,
					message,
					time: moment().format('h:mm a')
				})
			} catch (e) {
				console.log(e)
			}
		})

		// Listen for node changes
		socket.on('broadcast-node-added', (data) => {
			try {
				socket.broadcast
					.to(data.room)
					.emit('new-node-broadcast', { node: data.node })
			} catch (e) {
				console.log(e)
			}
		})

		// Position Update
		socket.on('broadcast-node-pos', (data) => {
			try {
				socket.broadcast
					.to(data.room)
					.emit('new-pos-broadcast', { node: data.node })
			} catch (e) {
				console.log(e)
			}
		})

		// Edge Update
		socket.on('new-edge-added-broadcast', (data) => {
			try {
				socket.broadcast.to(data.room).emit('add-new-edge', { edge: data.edge })
			} catch (e) {
				console.log(e)
			}
		})

		socket.on('mouse-pointer-broadcast', (data) => {
			try {
				socket.broadcast.to(data.room).emit('user-pointer-updates', {
					email: data.email,
					pos: { x: data.x, y: data.y }
				})
			} catch (e) {
				console.log(e)
			}
		})

		socket.on('remove-elements-broadcast', (data) => {
			try {
				socket.broadcast
					.to(data.room)
					.emit('remove-elements', { elements: data.elements })
			} catch (e) {
				console.log(e)
			}
		})

		// Video Operations

		socket.on('join-room', (data) => {
			// This is for when a room already exists in the users object
			// and a new user tries to join the room
			if (users[data.roomId]) {
				// For getting the total no. of users in the room
				const length = users[data.roomId].length
				// Limiting the total no. of users in a room to 4
				if (length === 4) {
					socket.emit('room-full')
					return
				}
				// If the limit is not reached then add a user to the room
				users[data.roomId].push(socket.id)
			} else {
				// This is for when a user is the first one to join the room
				users[data.roomId] = [socket.id]
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
				(userId) => userId !== socket.id
			)

			// Socket emit the user list
			socket.emit('all-users', { usersInThisRoom })
		})

		// Signalling - actions SEND and RECEIVE

		// SEND - When a user sends a signal for the HAND-SHAKE
		socket.on('sending-signal', (data) => {
			io.to(data.userToSignal).emit('user-joined', {
				signal: data.signal,
				callerId: data.callerId
			})
		})

		// RECEIVE
		socket.on('returning-signal', (data) => {
			io.to(data.callerId).emit('receiving-returned-signal', {
				signal: data.signal,
				id: socket.id
			})
		})

		// When a user get's disconnected
		// socket.on('disconnect', () => {
		// 	const roomId = socketToRoom[socket.id]
		// 	console.log(
		// 		`[server] socket-disconnect : ${socket.id}, roomId: ${roomId}`
		// 	)

		// 	io.to(roomId).emit('user-disconnected', { userId: socket.id })

		// 	let room = users[roomId]
		// 	if (room) {
		// 		room = room.filter((id) => id !== socket.id)
		// 		users[roomId] = room
		// 	}
		// })
	})
})
