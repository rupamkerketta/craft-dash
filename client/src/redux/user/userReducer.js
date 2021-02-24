import { SET_USER } from './userTypes'

const initialState = {
	username: '',
	email: '',
	thumbnail: '',
	avatar_id: 0
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				username: action.payload.username,
				email: action.payload.email,
				thumbnail: action.payload.thumbnail,
				avatar_id: action.payload.avatar_id
			}
		default:
			return state
	}
}

export default reducer
