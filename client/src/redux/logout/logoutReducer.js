import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from './logoutTypes'

const initialState = {
	isLoading: false
}

const reducer = (state = initialState, action) => {
	switch (action.case) {
		case LOGOUT_REQUEST:
			return {
				isLoading: true
			}
		case LOGOUT_SUCCESS:
			return {
				isLoading: false
			}
		case LOGOUT_FAILURE:
			return {
				isLoading: false
			}
		default:
			return state
	}
}

export default reducer
