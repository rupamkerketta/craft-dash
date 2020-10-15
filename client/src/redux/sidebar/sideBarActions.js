import * as TYPE from './sideBarTypes'

export const setFocusChat = () => (dispatch) => {
	dispatch({
		type: TYPE.SET_FOCUS_CHAT
	})
}

export const setFocusEdit = () => (dispatch) => {
	dispatch({
		type: TYPE.SET_FOCUS_EDIT
	})
}
