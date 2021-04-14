const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
	idea_board_id: {
		type: mongoose.Types.ObjectId,
		required: true
	},
	file_name: {
		type: String,
		required: true
	},
	thumbnail: {
		type: String,
		default: '',
		required: 'false'
	},
	original_file_name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	}
})

const File = mongoose.model('File', fileSchema)

module.exports = File
