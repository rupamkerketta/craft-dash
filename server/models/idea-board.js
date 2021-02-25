const mongoose = require('mongoose')

const ideaboardSchema = mongoose.Schema(
	{
		idea_board_name: {
			type: String,
			required: true,
			maxlength: 20,
			trim: true
		},
		idea_board_description: {
			type: String,
			required: true,
			trim: true
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		owner_email: {
			type: String,
			required: true,
			trim: true
		},
		owner_username: {
			type: String,
			required: true,
			trim: true
		},
		collaborators: [
			{
				email: { type: String, required: true, trim: true },
				username: { type: String, required: true, trim: true }
			}
		],
		ideas: []
	},
	{
		timestamps: true
	}
)

ideaboardSchema.statics.getAllBoards = async (user_id) => {
	const boards = await IdeaBoard.find({ owner: user_id })

	if (!boards || boards.length === 0) {
		return 'EMPTY'
	}

	return boards
}

ideaboardSchema.statics.deleteIdeaBoard = async (board_id, current_user_id) => {
	const ideaBoard = await IdeaBoard.findById(board_id)

	if (ideaBoard.owner.toString() === current_user_id.toString()) {
		const result = await ideaBoard.delete()
		return result
	} else {
		return -1
	}
}

const IdeaBoard = mongoose.model('IdeaBoard', ideaboardSchema)

module.exports = IdeaBoard
