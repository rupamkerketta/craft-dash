// const Room = require('../../models/room')
const moment = require('moment')

const chat = (socket, io) => {
	// Listen for chat message
	socket.on('chat-message', (data) => {
		console.log(`[chat-message] ${data.message}`)

		try {
			io.to(data.room).emit('chat-message', {
				username: data.username,
				message: data.message,
				time: moment().utc().format('h:mm a')
			})
			console.log('[chat-message-emitted]')
		} catch (e) {
			console.log(e)
		}
	})
}

module.exports = chat
