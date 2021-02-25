const express = require('express')
const router = express.Router()

// JWT helper
const { verifyToken: auth } = require('../helpers/jwt-helper')

// User Controllers
const userControllers = require('../controllers/user.controllers')

// Creating a new user 🆕
router.post('/create-new-user', userControllers.createNewUser)

// Login
router.post('/login', userControllers.login)

// Logout
router.get('/logout', auth, userControllers.logout)

// Logout All - from all devices
router.get('/logoutAll', auth, userControllers.logoutAll)

// Reading Profile
router.get('/me', auth, userControllers.me)

module.exports = router
