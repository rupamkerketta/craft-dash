import * as TYPE from './chatTypes'

const initialState = {
	messages: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.ADD_MESSAGE:
			return {
				messages: [ ...state.messages, action.payload ]
			}
		case TYPE.RESET_MESSAGES:
			return {
				messages: []
			}
		default:
			return state
	}
}

export default reducer
