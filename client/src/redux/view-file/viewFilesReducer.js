import * as TYPE from './viewFileTypes'

const initialState = {
	file_name: '',
	file_type: '',
	original_file_name: '',
	viewFile: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.VIEW_FILE_INFO:
			return { ...action.payload, viewFile: true }
		case TYPE.HIDE_FILE_INFO:
			return { ...state, viewFile: false }
		default:
			return state
	}
}

export default reducer
