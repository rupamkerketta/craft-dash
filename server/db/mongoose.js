const mongoose = require('mongoose')

const connect = async (callback) => {
	try {
		if (process.env.NODE_ENV == 'production') {
			await mongoose.connect(process.env.DB_CONNECTION_STR, {
				useNewUrlParser: true,
				useUnifiedTopology: true
			})
			console.log('[mongodb] Connected to the Database')
			callback()
		} else {
			await mongoose.connect(process.env.DB_CONNECTION_STR, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true
			})
			console.log('[mongodb] Connected to the Database')
			callback()
		}
	} catch (e) {
		console.log('[mongodb] Unable to connect to the database!!!')
		console.log(e)
	}
}

module.exports = {
	connect
}
