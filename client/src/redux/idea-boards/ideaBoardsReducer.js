import * as TYPE from './ideaBoardsTypes'

const initialState = {
	boards: {
		isLoading: false,
		error: '',
		data: []
	},
	new_board: {
		isLoading: false,
		error: '',
		info: null
	},
	delete_board: {
		isLoading: false,
		error: '',
		info: null
	}
}

// Write a function updating the boards after every action

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.ADD_NEW_BOARD:
			return {
				...state,
				boards: {
					...state.boards,
					data: [ ...state.boards.data, action.payload ]
				}
			}

		case TYPE.REMOVE_BOARD:
			return {
				...state,
				boards: {
					...state.boards,
					data: state.boards.data.filter((board) => board._id !== action.payload)
				}
			}

		case TYPE.IBS_REQUEST:
			return {
				...state,
				boards: {
					...state.boards,
					isLoading: true
				}
			}

		case TYPE.IBS_SUCCESS:
			console.log(action.payload)
			return {
				...state,
				boards: {
					...state.boards,
					isLoading: false,
					data: action.payload
				}
			}

		case TYPE.IBS_EMPTY:
			return {
				...state,
				boards: {
					...state.boards,
					isLoading: false
				}
			}

		case TYPE.IBS_FAILURE:
			return {
				...state.boards,
				boards: {
					...state.boards,
					isLoading: false,
					error: action.payload
				}
			}

		// CREATE
		case TYPE.IB_CREATE_REQUEST:
			return {
				...state,
				new_board: {
					...state.new_board,
					isLoading: true
				}
			}

		case TYPE.IB_CREATE_SUCCESS:
			return {
				...state,
				new_board: {
					...state.new_board,
					isLoading: false,
					info: action.payload
				}
			}

		case TYPE.IB_CREATE_FAILURE:
			return {
				...state,
				new_board: {
					...state.new_board,
					isLoading: false,
					error: action.payload
				}
			}

		// DELETE
		case TYPE.IB_DELETE_REQUEST:
			return {
				...state,
				delete_board: {
					...state.delete_board,
					isLoading: true
				}
			}

		case TYPE.IB_DELETE_SUCCESS:
			return {
				...state,
				delete_board: {
					...state.delete_board,
					isLoading: false,
					info: action.payload
				}
			}

		case TYPE.IB_DELETE_FAILURE:
			return {
				...state,
				delete_board: {
					...state.delete_board,
					isLoading: false,
					error: action.payload
				}
			}

		case TYPE.UPDATE_IB_COLLABORATORS_ADD:
			return {
				...state,
				boards: {
					...state.boards,
					data: state.boards.data.map((idea_board) => {
						if (idea_board._id.toString() === action.payload.idea_board_id) {
							idea_board.collaborators.push(action.payload.new_collaborator)
						}
						return idea_board
					})
				}
			}

		case TYPE.UPDATE_IB_COLLABORATORS_REMOVE:
			const removeCollaborator = (arr, idea_board_id, removed_collaborator) => {
				arr.forEach((board) => {
					if (board._id.toString() === idea_board_id.toString()) {
						const index = board.collaborators.indexOf(removed_collaborator)
						board.collaborators.splice(index, 1)
					}
				})
				return arr
			}

			return {
				...state,
				boards: {
					...state.boards,
					data: Object.assign(
						[],
						removeCollaborator(
							state.boards.data,
							action.payload.idea_board_id,
							action.payload.removed_collaborator
						)
					)
				}
			}

		default:
			return state
	}
}

export default reducer
