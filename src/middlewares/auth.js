const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Auth middleware
const auth = async (req, res, next) => {
	try {
		// console.log(`[auth] cookie-test req.cookies.token : ${req.cookies.token}`)
		const token = req.cookies.token.replace('Bearer ', '')

		const decoded = jwt.verify(token, process.env.SIGNATURE)

		const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

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

module.exports = auth
