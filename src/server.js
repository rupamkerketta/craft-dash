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
const { userJoin, getCurrentUser } = require('./chat-module/user')

// mongoDB Connection Module
require('./db/mongoose')

const origin = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'

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
const { isContext } = require('vm')

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
		res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
	})
}

mongoose.connect(() => {
	server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

	io.on('connection', (socket) => {
		socket.on('joinRoom', ({ username, room }) => {
			const user = userJoin(socket.id, username, room)

			socket.join(user.room)
		})

		socket.on('joinRoomMain', (data) => {
			socket.join(`${data.room}-main`)
		})

		// Listen for chat message
		socket.on('chat-message', (message) => {
			try {
				const user = getCurrentUser(socket.id)
				io
					.to(user.room)
					.emit('chat-message', { username: user.username, message, time: moment().format('h:mm a') })
			} catch (e) {
				console.log(e)
			}
		})

		// Listen for node changes
		socket.on('broadcast-node-added', (data) => {
			try {
				socket.broadcast.to(`${data.room}-main`).emit('new-node-broadcast', { node: data.node })
			} catch (e) {
				console.log(e)
			}
		})

		// Position Update
		socket.on('broadcast-node-pos', (data) => {
			try {
				socket.broadcast.to(`${data.room}-main`).emit('new-pos-broadcast', { node: data.node })
			} catch (e) {
				console.log(e)
			}
		})

		// Edge Update
		socket.on('new-edge-added-broadcast', (data) => {
			try {
				socket.broadcast.to(`${data.room}-main`).emit('add-new-edge', { edge: data.edge })
			} catch (e) {
				console.log(e)
			}
		})

		socket.on('mouse-pointer-broadcast', (data) => {
			try {
				socket.broadcast
					.to(`${data.room}-main`)
					.emit('user-pointer-updates', { email: data.email, pos: { x: data.x, y: data.y } })
			} catch (e) {
				console.log(e)
			}
		})
	})
})
