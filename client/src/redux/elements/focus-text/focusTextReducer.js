import * as TYPE from './focusTextTypes'

const initialState = ''

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.SET_FOCUS_TEXT:
			return action.payload
		case TYPE.RESET_FOCUS_TEXT:
			return initialState
		default:
			return state
	}
}

export default reducer
