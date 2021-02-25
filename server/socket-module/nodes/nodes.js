const nodes = (socket) => {
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

	socket.on('remove-elements-broadcast', (data) => {
		try {
			socket.broadcast
				.to(data.room)
				.emit('remove-elements', { elements: data.elements })
		} catch (e) {
			console.log(e)
		}
	})

	// real-time text update
	socket.on('send-updated-text', (data) => {
		// console.log(data.id, ' ', data.text, ' ', data.room)
		socket.broadcast.to(data.room).emit('receiving-updated-text', data)
	})
}

module.exports = nodes
