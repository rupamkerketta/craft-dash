const router = require('express').Router()
const passport = require('passport')

// JWT helper
const { signToken } = require('../helpers/jwt-helper')
const User = require('../models/user')

// Google Authentication route
router.get(
	'/google',
	passport.authenticate('google', {
		session: false,
		scope: ['profile', 'email']
	})
)

// Google Authentication callback route
router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/failure'
	}),
	async (req, res) => {
		try {
			const token = await signToken(req.user._id)

			const user = await User.findById(req.user._id)
			user.tokens = user.tokens.concat({ token })
			await user.save()

			// Cookie Validity - 30 Days
			res.cookie('token', `Bearer ${token}`, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			})

			if (process.env.NODE_ENV === 'production') {
				res.redirect('https://craftdash.xyz/#/dashboard')
			} else {
				res.redirect('http://localhost:3000')
			}
		} catch (err) {
			console.log(err)
			res.status(500).send()
		}
	}
)

module.exports = router
