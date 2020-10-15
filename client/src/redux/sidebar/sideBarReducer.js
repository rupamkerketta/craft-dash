import * as TYPE from './sideBarTypes'

const initialState = {
	chat: true,
	edit: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.SET_FOCUS_CHAT:
			return {
				chat: true,
				edit: false
			}
		case TYPE.SET_FOCUS_EDIT:
			return {
				chat: false,
				edit: true
			}
		default:
			return state
	}
}

export default reducer
