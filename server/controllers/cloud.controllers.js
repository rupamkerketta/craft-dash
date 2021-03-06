const { cloud_bucket } = require('../cloud-module/cloud-module')

// File Model
const File = require('../models/file')

// # - Sharp
const sharp = require('sharp')

// UUID
const { v4: uuid } = require('uuid')

module.exports = {
	// File(s) Upload
	uploadFile: async (req, res) => {
		try {
			const idea_board_id = req.body.idea_board_id
			const files_info = []

			// Counter
			let c = 0

			// File Info
			let original_file_name = ''
			let new_file_name = ''
			let file_extension = ''
			let thumbnail = ''
			let mimetype = ''

			// Processing file info (first)
			req.files.map(async (file) => {
				mimetype = file.mimetype

				console.log(file)

				if (file.originalname === 'blob' && file.mimetype === 'audio/*') {
					file.originalname = `file-${Date.now()}.mp3`
					file.mimetype = 'audio/mp3'
				}
				file_extension = file.originalname.split('.')
				file_extension = file_extension[file_extension.length - 1]

				// UUID for the file
				file_uuid = uuid()

				original_file_name = file.originalname
				new_file_name = file_uuid + '.' + file_extension

				if (mimetype.startsWith('image/')) {
					thumbnail = file_uuid + '-thumbnail.' + file_extension
				} else {
					thumbnail = ''
				}

				files_info.push({
					idea_board_id,
					file_name: new_file_name,
					original_file_name,
					thumbnail,
					type: mimetype
				})
			})

			// Uploading Files to GCS
			files_info.map((file, index) => {
				const blob = cloud_bucket.file(file.file_name)
				const blobStream = blob.createWriteStream()

				blobStream.end(req.files[index].buffer)

				blobStream.on('finish', async () => {
					c += 1

					console.log(`File Uploaded : ${req.files[index].originalname}`)

					const [metadata] = await cloud_bucket
						.file(file.file_name)
						.getMetadata()
					const mime_type = metadata.contentType
					console.log(mime_type)

					// Allocating the Mimetype and Thumbnail
					if (files_info[index.type !== mime_type]) {
						console.log('[File-Type] changed!!!')
						files_info[index].type = mime_type
					}

					if (files_info[index].thumbnail === '') {
						console.log('[Thumbnail] updated!!!')
						console.log(mime_type)
						files_info[index].thumbnail = determineTag(mime_type)
					}

					if (file.type.startsWith('image/')) {
						const blob_th = cloud_bucket.file(file.thumbnail)
						const blobStream_th = blob_th.createWriteStream()

						await sharp(req.files[index].buffer)
							.resize({
								width: 200,
								height: 200,
								fit: sharp.fit.cover
							})
							.toBuffer()
							.then((data) => {
								blobStream_th.end(data)
							})
					}

					if (c === files_info.length) {
						console.log('Files uploaded successfully!!!!')

						// Updating files_info in the database
						const response = await File.insertMany(files_info)

						res.send({
							message: 'Files uploaded successfully',
							files_info: response
						})
					}
				})
			})
		} catch (e) {
			console.log(e)
			res.status(500).send({ msg: 'Internal Server Error' })
		}
	},

	// Retrieving files info from the DB
	getFilesInfo: async (req, res) => {
		try {
			const idea_board_id = req.body.idea_board_id
			const files = await File.find({ idea_board_id })

			if (!files) {
				// NRF - No Records Found
				res.status(400).send({ msg: 'NRF' })
				return
			}

			const files_info = files.map((file) => {
				return {
					original_file_name: file.original_file_name,
					file_name: file.file_name,
					file_type: file.type,
					file_thumbnail: file.thumbnail
				}
			})

			res.send(files_info)
		} catch (err) {
			console.log(err)
			res.status(500).send({ msg: 'Internal Server Error!!!' })
		}
	},

	// File Stream
	getFile: async (req, res) => {
		try {
			const file_name = req.params.id
			const remote_file = cloud_bucket.file(file_name)

			remote_file
				.createReadStream()
				.on('error', function (err) {})
				.on('response', function (response) {
					// Server connected and responded with the specified status and headers.
				})
				.on('end', function () {
					// The file is fully downloaded.
				})
				.pipe(res)
		} catch (err) {
			console.log(err)
			res.status(500).send({ msg: 'Internal Server Error!!!' })
		}
	},

	// Delete File
	deleteFile: async (req, res) => {
		try {
			const result = await File.deleteOne({ file_name: req.params.id })
			if (result.deletedCount === 0) {
				res.status(400).send({ message: 'File could not be deleted!!!' })
				return
			}
			console.log(result)

			const file_name = req.params.id
			const remote_file = cloud_bucket.file(file_name)

			await remote_file.delete()
			res.send({ file_name })
		} catch (error) {
			console.log(error)
			res.status(500).send({ msg: 'Internal Server Error!!!' })
		}
	},

	// Get MetaData
	fileMetaData: async (req, res) => {
		try {
			if (req.query.name) {
				const remote_file = cloud_bucket.file(req.query.name)
				const file_meta_res = await remote_file.getMetadata()

				const [metadata] = file_meta_res

				res.send({
					file_name: metadata.name,
					file_size: metadata.size,
					time_created: new Date(metadata.timeCreated)
				})
				return
			}

			res.status(400).send({ message: 'Bad Request!!!' })
		} catch (error) {
			console.error(error)
			res.status(500).send({ message: 'Internal Server Error!!!' })
		}
	}
}

const determineTag = (mimetype) => {
	const [type, sub_type] = mimetype.split('/')
	console.log(type, ' ', sub_type)

	const tag_dict = {
		text: [
			['html', '#html'],
			['css', '#css'],
			['x-sass', '#scss'],
			['x-scss', '$scss'],
			['plain', '#txt']
		],
		application: [
			['pdf', '#pdf'],
			['vnd.openxmlformats-officedocument.wordprocessingml.document', '#docx']
		]
	}

	const v1 = tag_dict[type]

	if (v1 === undefined) {
		return '#generic'
	} else {
		const v2 = v1.find((sub_type_dict) => sub_type_dict[0] === sub_type)
		if (v2 !== undefined) {
			return v2[1]
		} else {
			return '#generic'
		}
	}
}
