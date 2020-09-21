import * as TYPE from './loginTypes'

const initialState = {
	loading: false,
	isAuthenticated: false,
	error: ''
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.LOGIN_REQUEST:
			return {
				...state,
				loading: true
			}
		case TYPE.LOGIN_SUCCESS:
			return {
				loading: false,
				isAuthenticated: true,
				message: action.payload
			}
		case TYPE.LOGIN_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload
			}
		case TYPE.LOAD_CHECK_FAIL:
			return {
				...state,
				loading: false,
				isAuthenticated: false
			}
		default:
			return state
	}
}

export default reducer
