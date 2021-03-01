const mousePointer = (socket) => {
	socket.on('mouse-pointer-broadcast', (data) => {
		try {
			socket.broadcast.to(data.room).emit('user-pointer-updates', {
				email: data.user_email,
				username: data.username,
				pos: { x: data.x, y: data.y }
			})
		} catch (e) {
			console.log(e)
		}
	})
}

module.exports = mousePointer
