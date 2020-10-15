import * as TYPE from './focusElementsTypes'

// Focus Element - Node
export const setFocusNode_Main = (element) => (dispatch) => {
	dispatch(setFocusNode(element))
}

// Focus Element - Edge
export const setFocusEdge_Main = (edge) => (dispatch) => {
	dispatch(setFocusEdge(edge))
}

// Deselect All
export const deSelectAll_Main = () => (dispatch) => {
	dispatch(deselectAll())
}
const setFocusNode = (data) => {
	return {
		type: TYPE.SET_FOCUS_NODE,
		payload: data
	}
}

const setFocusEdge = (data) => {
	return {
		type: TYPE.SET_FOCUS_EDGE,
		payload: data
	}
}

const deselectAll = () => {
	return {
		type: TYPE.RESET_FOCUS_ELEMENTS
	}
}
