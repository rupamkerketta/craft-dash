const express = require('express')
const router = express.Router()

// JWT helper
const { verifyToken: auth } = require('../helpers/jwt-helper')

// IdeaBoard Controllers
const ideaBoardControllers = require('../controllers/idea-board.controllers')

// Creating a new idea Board 🆕
router.post(
	'/create-new-idea-board',
	auth,
	ideaBoardControllers.createNewIdeaBoard
)

// Get all boards
router.get('/get-idea-boards', auth, ideaBoardControllers.getIdeaBoards)

// Delete board
router.delete('/delete-board/:id', auth, ideaBoardControllers.deleteIdeaBoard)

module.exports = router
