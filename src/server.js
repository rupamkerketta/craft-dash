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
		socket.on('on-drag-stop', (data) => {
			try {
				io.to(data.room).emit('node-drag-stop', { node: data.node })
			} catch (e) {
				console.log(e)
			}
		})

		socket.on('send-add-node', (data) => {
			try {
				console.log(`[node-update] ${JSON.stringify(data.node)} roomId: "${data.room}"`)
				socket.broadcast.to(data.room).emit('receive-add-node', { node: data.node })
			} catch (e) {
				console.log(e)
			}
		})
	})
})
