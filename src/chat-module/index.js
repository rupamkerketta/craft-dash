const { userJoin, getCurrentUser } = require('./user')

const listen = (app) => {
	const http = require('http').createServer(app)
	const io = require('socket.io').listen(http)

	// Run when a client connects
}

module.exports = {
	listen
}
