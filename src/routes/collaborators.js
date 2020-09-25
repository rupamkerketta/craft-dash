const express = require('express')
const router = express.Router()

// Middleware
const auth = require('../middlewares/auth')

// Models
const User = require('../models/user')
const IdeaBoard = require('../models/idea-board')

// Check Add Remove
router.post('/', auth, async (req, res) => {
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
				// Only perform the actions if the user is the owner if the idea-board
				if (ideaBoard.owner.toString() === req.user._id.toString()) {
					if (action === 'add-collaborator') {
						if (ideaBoard.collaborators.includes(email)) {
							// If the collaborator already added to the ideaboard
							// Throw error
							throw new Error()
						}
						ideaBoard.collaborators = ideaBoard.collaborators.concat(email)
						result.added_to = result.added_to.concat(ideaBoard._id)

						await ideaBoard.save()
						await result.save()

						res.send({ message: 'Collaborator added successfully!!!' })
					} else if (action === 'remove-collaborator') {
						const index_idb = ideaBoard.collaborators.indexOf(email)
						ideaBoard.collaborators.splice(index_idb, 1)

						const index_added_ibd = result.added_to.indexOf(ideaBoard._id)
						console.log(index_added_ibd)
						result.added_to.splice(index_added_ibd, 1)
						console.log(result)

						await ideaBoard.save()
						await result.save()
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
