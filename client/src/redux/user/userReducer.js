import { SET_USER } from './userTypes'

const initialState = {
	username: '',
	email: ''
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				username: action.payload.username,
				email: action.payload.email
			}
		default:
			return state
	}
}

export default reducer
