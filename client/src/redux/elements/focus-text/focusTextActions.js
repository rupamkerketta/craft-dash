import * as TYPE from './focusTextTypes'

// Focus Text - Dispatch
export const setFocusText_Main = (data) => (dispatch) => {
	dispatch(setFocusTextAction(data))
}

// Focus Text - Action
const setFocusTextAction = (data) => {
	return {
		type: TYPE.SET_FOCUS_TEXT,
		payload: data
	}
}

// Reset Text - Dispatch
export const resetFocusText = () => (dispatch) => {
	dispatch(resetFocusTextAction())
}

// Reset Text - Action
const resetFocusTextAction = () => {
	return {
		type: TYPE.RESET_FOCUS_TEXT
	}
}
