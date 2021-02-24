// User Model
const User = require('../models/user')

module.exports = {
	// Creating a New User
	createNewUser: async (req, res) => {
		try {
			const user = new User(req.body)
			const token = await user.getAuthToken()

			// Cookie Validity - 30 Days
			res.cookie('token', `Bearer ${token}`, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			})
			res.send({ username: user.username, email: user.email })
		} catch (e) {
			// printErrMsg(req.url, req.method, e.stack)
			console.log(e.message)
			if (
				e.message.includes('email') &&
				e.message.includes('duplicate key error')
			) {
				res.status(500).send({ message: `${req.body.email} already exists!!!` })
			} else {
				res
					.status(500)
					.send({ message: 'Unable to create account. Please try again later' })
			}
		}
	},

	// Login
	login: async (req, res) => {
		try {
			const user = await User.findByCredentials(
				req.body.username,
				req.body.password
			)
			const token = await user.getAuthToken()

			// Cookie Validity - 30 Days
			res.cookie('token', `Bearer ${token}`, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			})
			res.send({
				username: user.username,
				email: user.email,
				message: 'Logged-In Successfully'
			})
		} catch (e) {
			res.status(400).send()
		}
	},

	// Logout
	logout: async (req, res) => {
		try {
			req.user.tokens = req.user.tokens.filter((token) => {
				return token.token != req.token
			})
			await req.user.save()
			res.send({ message: 'Logged Out Successfully' })
		} catch (e) {
			res.status(500).send()
		}
	},

	// Logout All
	logoutAll: async (req, res) => {
		try {
			req.user.tokens = req.user.tokens.filter((token) => {
				return token.token != req.token
			})
			await req.user.save()
			res.send({ message: 'Logged Out Successfully' })
		} catch (e) {
			res.status(500).send()
		}
	},

	// Reading Profile Info
	me: (req, res) => {
		try {
			const user = req.user.toJSON()

			delete user.password
			delete user.tokens

			res.send(user)
		} catch (e) {
			res.status(500).send()
		}
	}
}
