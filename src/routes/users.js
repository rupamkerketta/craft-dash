const express = require('express')
const router = express.Router()

// Middleware
const auth = require('../middlewares/auth')

// Models
const User = require('../models/user')

// Error message formatter
const { printErrMsg } = require('../utils/format-err-msg')

// Creating a new user 🆕
router.post('/create-new-user', async (req, res) => {
	try {
		const user = new User(req.body)
		const token = await user.getAuthToken()

		res.cookie('token', `Bearer ${token}`, { httpOnly: true })
		res.send({ username: user.username, email: user.email })
	} catch (e) {
		printErrMsg(req.url, req.method, e.stack)
		if (e.message.includes('email') && e.message.includes('duplicate key error')) {
			res.status(500).send({ message: 'Email already exists!!!' })
		} else if (e.message.includes('username')) {
			res.status(500).send({ message: 'Username already taken!!!' })
		} else {
			res.status(500).send({ message: 'Unable to create account. Please try again later' })
		}
	}
})

// Login
router.post('/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.username, req.body.password)
		const token = await user.getAuthToken()

		res.cookie('token', `Bearer ${token}`, { httpOnly: true })
		res.send({ message: 'Logged-In Successfully', token })
	} catch (e) {
		// printErrMsg(req.url, req.method, e.stack)
		res.status(400).send()
	}
})

// Artificial Sleep
const sleep = (callback, time) => {
	const stop = new Date().getTime() + time
	while (new Date().getTime() < stop) {}
	callback()
}

// Reading Profile
router.get('/me', auth, (req, res) => {
	const block = () => {
		try {
			res.send(req.user)
		} catch (e) {
			printErrMsg(req.url, req.method, e.stack)
			res.status(500).send()
		}
	}
	block()
	// sleep(block, 5000);
})

// Logout
router.get('/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token != req.token
		})
		await req.user.save()
		res.send({ message: 'Logged Out Successfully' })
	} catch (e) {
		res.status(500).send()
	}
})

// Logout All
router.get('/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = []
		await req.user.save()
		res.send({ message: 'Successfully Logged Out of All Sessions' })
	} catch (e) {
		printErrMsg(req.url, req.method, e.stack)
		res.status(500).send()
	}
})

module.exports = router
