import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './signupTypes'

const initialState = {
	loading: false,
	errors: ''
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGNUP_REQUEST:
			return {
				...state,
				loading: true
			}
		case SIGNUP_SUCCESS:
			return {
				...state,
				loading: false
			}
		case SIGNUP_FAILURE:
			return {
				loading: false,
				errors: action.payload
			}
		default:
			return state
	}
}

export default reducer
