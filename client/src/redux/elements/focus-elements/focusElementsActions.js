import * as TYPE from './focusElementsTypes'

// Focus Element
export const setFocusElement_Main = (data) => (dispatch) => {
	dispatch(setFocusElement(data))
}

// Deselect All
export const deSelectAll_Main = () => (dispatch) => {
	dispatch(deselectAll())
}

const setFocusElement = (data) => {
	return {
		type: TYPE.SET_FOCUS_ELEMENT,
		payload: data
	}
}

const deselectAll = () => {
	return {
		type: TYPE.RESET_FOCUS_ELEMENTS
	}
}
