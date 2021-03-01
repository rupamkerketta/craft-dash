const { cloud_bucket } = require('../cloud-module/cloud-module')

// File Model
const File = require('../models/file')

module.exports = {
	uploadFile: (req, res) => {
		try {
			console.log(req.files)
			const idea_board_id = req.body.idea_board_id

			let file_meta = []

			let blob = null
			let blobStream = null
			let file_extension = ''
			let og_name = ''

			let obj_length = Object.keys(req.files).length

			Object.keys(req.files).forEach((file) => {
				// Extracting the file extension
				file_extension = req.files[file].mimetype.split('/')[1]

				// Original File Name
				og_name = req.files[file].name

				// Renaming the file
				req.files[file].name = Date.now() + `.${file_extension}`

				blob = cloud_bucket.file(req.files[file].name)
				blobStream = blob.createWriteStream()

				blobStream.end(req.files[file].data)

				file_meta.push({
					idea_board_id,
					file_name: req.files[file].name,
					original_file_name: og_name,
					type: req.files[file].mimetype
				})
			})

			blobStream.on('finish', async () => {
				let i = 0
				console.log(obj_length)
				while (i < obj_length) {
					console.log(file_meta[i])
					const file = new File({ ...file_meta[i] })
					await file.save()
					i = i + 1
				}
				res.status(200).send({ msg: 'Files uploaded!!!' })
			})
		} catch (e) {
			console.log(e)
			res.status(500).send({ msg: 'Internal Server Error' })
		}
	}
}
