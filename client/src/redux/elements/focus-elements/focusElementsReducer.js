import * as TYPE from './focusElementsTypes'

const initialState = {
	focus_element: {}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.SET_FOCUS_ELEMENT:
			return {
				...state,
				focus_element: { ...action.payload }
			}

		case TYPE.RESET_FOCUS_ELEMENTS:
			return Object.assign(initialState)

		default:
			return state
	}
}

export default reducer
