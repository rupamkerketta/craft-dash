import * as TYPE from './focusElementsTypes'

const initialState = {
	focus_node: {},
	focus_edge: {}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.SET_FOCUS_NODE:
			return {
				...state,
				focus_node: { ...action.payload }
			}
		case TYPE.SET_FOCUS_EDGE:
			return {
				...state,
				focus_edge: { ...action.payload }
			}
		case TYPE.RESET_FOCUS_ELEMENTS:
			return Object.assign(initialState)
		default:
			return state
	}
}

export default reducer
