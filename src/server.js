// Environment Variables Configuration
if (process.env.NODE_ENV !== 'production') {
	const result = require('dotenv').config()

	if (result.error) {
		console.log(result.error)
	}
}

const express = require('express')
const app = express()

const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('./db/mongoose')
const passport = require('passport')
const socketio = require('socket.io')
const http = require('http')

const server = http.createServer(app)
const io = socketio(server)

// mongoDB Connection Module
require('./db/mongoose')

// Social Login config
require('./auth/social-login')

// JOIN, LEAVE, LOG operations on the room (chat and main)
// Video room operations excluded !!!
const {
	userJoin,
	getCurrentUser,
	userLeaves,
	getRoomUsers
} = require('./chat-module/user')

const origin =
	process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'

const corsOptions = {
	origin: origin,
	credentials: true
}

const PORT = process.env.PORT || 5000

// Routers
const usersRouter = require('./routes/user-routes')
const ideaBoardRouter = require('./routes/idea-board-routes')
const collaboratorsRouter = require('./routes/collaborator-routes')
const authRouter = require('./routes/social-login-routes')

// Middlewares
app.use(
	express.json(),
	cookieParser(),
	cors(corsOptions),
	passport.initialize()
)
app.use('/api/user', usersRouter)
app.use('/api/idea-board', ideaBoardRouter)
app.use('/api/collaborators', collaboratorsRouter)
app.use('/auth', authRouter)

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

// const users = {}
// const socketToRoom = {}

const socketModule = require('./socket-module/socket-module')

mongoose.connect(() => {
	try {
		server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

		io.on('connection', (socket) => {
			console.log(`[new socket-connection] ${socket.id}`)
			socketModule(socket, io)
		})
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: 'Internal Server Problem !!!' })
	}
})
