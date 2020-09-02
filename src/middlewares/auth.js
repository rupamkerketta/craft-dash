const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Auth middleware
const auth = async (req, res, next) => {
	try {
		const token = req.headers['authorization'].replace('Bearer ', '')
		console.log(token)
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
