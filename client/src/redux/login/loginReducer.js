import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOAD_CHECK_FAIL } from './loginTypes'

const initialState = {
	loading: false,
	isAuthenticated: false,
	error: ''
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				loading: true
			}
		case LOGIN_SUCCESS:
			return {
				loading: false,
				isAuthenticated: true,
				message: action.payload
			}
		case LOGIN_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload
			}
		case LOAD_CHECK_FAIL:
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
