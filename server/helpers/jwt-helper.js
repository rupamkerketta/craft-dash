const jwt = require('jsonwebtoken')
const createError = require('http-errors')

// User Model
const User = require('../models/user')

module.exports = {
	// Creating or signing JWT
	signToken: (user_id) => {
		return new Promise((resolve, reject) => {
			const secret = process.env.SIGNATURE
			const payload = { _id: user_id }
			const options = {
				expiresIn: '30d'
			}

			// JWT Sign
			jwt.sign(payload, secret, options, (err, token) => {
				if (err) {
					console.log(err)
					reject(createError.InternalServerError())
					return
				}

				resolve(token)
			})
		})
	},

	// Verifying JWT
	verifyToken: async (req, res, next) => {
		try {
			const token = req.cookies.token.replace('Bearer ', '')

			const decoded = jwt.verify(token, process.env.SIGNATURE)

			const user = await User.findOne({
				'_id': decoded._id,
				'tokens.token': token
			})

			if (!user) {
				throw new Error()
			}

			req.token = token
			req.user = user
			next()
		} catch (e) {
			console.log(e)
			res.status(401).send({ msg: 'Please authenticate' })
		}
	}
}
