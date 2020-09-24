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
	app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
})
