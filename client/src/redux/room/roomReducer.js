import * as TYPE from './roomTypes'

const initialState = {
	id: '',
	users: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.SET_ROOM_ID:
			return {
				...state,
				id: action.payload
			}
		case TYPE.ADD_USERS:
			return {
				...state,
				users: [ ...action.payload ]
			}
		case TYPE.ADD_USER:
			return {
				...state,
				users: [ ...state.users, action.payload ]
			}
		case TYPE.REMOVE_USER:
			return {
				...state,
				users: Object.assign(state.users.filter((user) => user.email !== action.payload.email))
			}
		default:
			return state
	}
}

export default reducer
