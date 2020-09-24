const express = require('express')
const router = express.Router()

// Middleware
const auth = require('../middlewares/auth')

// Models
const User = require('../models/user')
const IdeaBoard = require('../models/idea-board')

// Check and Add
router.post('/collaborators', auth, async (req, res) => {
	try {
		const { email, idea_board_id } = req.body

		let action = ''

		if (req.query.action) {
			action = req.query.action
		} else {
			action = req.query.action
		}

		if (email === req.user.email) {
			res.status(400).send({ message: 'Bad Request!!!' })
		}

		// Check if the user exists or not
		const result = await User.findOne({ email })

		console.log(result)

		if (result) {
			const ideaBoard = await IdeaBoard.findById(idea_board_id)

			if (ideaBoard) {
				if (ideaBoard.owner.toString() === req.user._id.toString()) {
					if (action === 'ADD') {
						ideaBoard.collaborators = ideaBoard.collaborators.concat(email)
						await ideaBoard.save()
						res.send({ message: 'Collaborator added successfully!!!' })
					} else if (action === 'REMOVE') {
						const index = ideaBoard.collaborators.indexOf(email)
						ideaBoard.collaborators.splice(index, 1)
						await ideaBoard.save()
						res.send({ message: 'Collaborator removed successfully!!!' })
					} else {
						throw new Error()
					}
				} else {
					throw new Error()
				}
			} else {
				throw new Error()
			}
		} else {
			res.status(404).send()
		}
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: 'ERROR [check-and-update]' })
	}
})

module.exports = router
