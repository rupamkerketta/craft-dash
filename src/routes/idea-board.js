const express = require('express')
const router = express.Router()

// Middleware
const auth = require('../middlewares/auth')

// Models
const IdeaBoard = require('../models/idea-board')

// Creating a new idea Board 🆕
router.post('/create-new-idea-board', auth, async (req, res) => {
	try {
		const ideaBoard = new IdeaBoard({
			owner: req.user._id,
			...req.body
		})
		const result = await ideaBoard.save()
		res.send(result)
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: "Couldn't create board . Please try again later." })
	}
})

// Get all boards
router.get('/get-idea-boards', auth, async (req, res) => {
	try {
		const boards = await IdeaBoard.getAllBoards(req.user._id)

		if (boards === 'EMPTY') {
			// NFR - No Records Found
			res.send({ message: 'NRF' })
		} else {
			res.send(boards)
		}
	} catch (e) {
		console.log(e)
		res.status(500).message({ message: 'Fetching error!!!' })
	}
})

// Delete board
router.delete('/delete-board/:id', auth, async (req, res) => {
	try {
		const ideaBoard = await IdeaBoard.deleteIdeaBoard(req.params.id, req.user._id)
		if (ideaBoard === -1) {
			res.status(401).send({ message: 'Action not allowed' })
		} else {
			res.send({ message: 'IdeaBoard deleted successfully!!!', info: ideaBoard })
		}
	} catch (e) {
		console.log(e)
		res.status(500)
	}
})

const sleep = (callback, time) => {
	const stop = new Date().getTime() + time
	while (new Date().getTime() < stop) {}
	callback()
}

module.exports = router
