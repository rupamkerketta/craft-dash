const fs = require('fs')
const path = require('path')
const base64 = require('base-64')
const { Storage } = require('@google-cloud/storage')

const file_path = path.join(__dirname, 'key.json')

// require('dotenv').config()

// Environment Variables Configuration
if (process.env.NODE_ENV === 'production') {
	try {
		if (fs.existsSync(file_path)) {
			//file exists
			console.log('File already exists!!!')
		} else {
			const google_cs_key = base64.decode(
				process.env.GOOGLE_CS_PROJECT_CREDENTIALS
			)

			// writeFile function with filename, content and callback function
			fs.writeFile(
				path.join(__dirname, 'key.json'),
				google_cs_key,
				function (err) {
					if (err) throw err
					console.log('File is created successfully.')
				}
			)
		}
	} catch (err) {
		console.error(err)
	}
}

const file_name = path.join(__dirname, 'key.json')
console.log(file_name)

// Creates a client from a Google service account key.
const storage = new Storage({
	keyFilename: file_name,
	projectId: 'craft-dash-300504'
})

const cloud_bucket = storage.bucket('craft-dash')

module.exports = { cloud_bucket }
