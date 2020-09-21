import * as TYPE from './logoutTypes'

const initialState = {
	isLoading: false
}

const reducer = (state = initialState, action) => {
	switch (action.case) {
		case TYPE.LOGOUT_REQUEST:
			return {
				isLoading: true
			}
		case TYPE.LOGOUT_SUCCESS:
			return {
				isLoading: false
			}
		case TYPE.LOGOUT_FAILURE:
			return {
				isLoading: false
			}
		default:
			return state
	}
}

export default reducer
