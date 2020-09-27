import * as TYPE from './collaboratorTypes'

const initialState = {
	isLoading: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.COLLABORATOR_REQUEST:
			return {
				isLoading: true
			}
		case TYPE.COLLABORATOR_SUCCESS:
			return {
				isLoading: false
			}
		case TYPE.COLLABORATOR_FAILURE:
			return {
				isLoading: false
			}
		default:
			return state
	}
}

export default reducer
