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

		default:
			return state
	}
}

export default reducer
