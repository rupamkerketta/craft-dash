const mousePointer = (socket) => {
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
}

module.exports = mousePointer
