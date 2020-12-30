const express = require('express')
const router = express.Router()

// JWT helper
const { verifyToken: auth } = require('../helpers/jwt-helper')

// Models
const User = require('../models/user')
const IdeaBoard = require('../models/idea-board')

// Check Add Remove
router.post('/', auth, async (req, res) => {
	try {
		const { email, idea_board_id, action } = req.body

		// console.log(email, idea_board_id, action)

		// Check if the user exists or not
		const result = await User.findOne({ email })

		// console.log(result)

		if (result) {
			const ideaBoard = await IdeaBoard.findById(idea_board_id)

			if (ideaBoard) {
				// Only perform the actions if the user is the owner of the idea-board
				if (
					ideaBoard.owner.toString() === req.user._id.toString() &&
					email !== req.user.email
				) {
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

						const collaborator_info = {
							email: result.email,
							_id: result._id
						}

						res.send({
							message: 'Collaborator added successfully!!!',
							new_collaborator: collaborator_info
						})
					} else if (action === 'remove-collaborator') {
						// console.log(`[remove-collaborator]`)
						const index_idb = ideaBoard.collaborators.indexOf(email)
						ideaBoard.collaborators.splice(index_idb, 1)

						const index_added_ibd = result.added_to.indexOf(ideaBoard._id)
						// console.log(index_added_ibd)
						result.added_to.splice(index_added_ibd, 1)
						// console.log(result)

						await ideaBoard.save()
						await result.save()

						const collaborator_info = {
							email: result.email,
							_id: result._id
						}

						res.send({
							message: 'Collaborator removed successfully!!!',
							removed_collaborator: collaborator_info
						})
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
