import * as TYPE from './collaboratorTypes'

const initialState = {
	addIsLoading: false,
	removeIsLoading: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.ADD_COLLABORATOR_REQUEST:
			return {
				...state,
				addIsLoading: true
			}
		case TYPE.ADD_COLLABORATOR_SUCCESS:
			return {
				...state,
				addIsLoading: false
			}
		case TYPE.ADD_COLLABORATOR_FAILURE:
			return {
				...state,
				addIsLoading: false
			}
		case TYPE.REMOVE_COLLABORATOR_REQUEST:
			return {
				...state,
				removeIsLoading: true
			}
		case TYPE.REMOVE_COLLABORATOR_SUCCESS:
			return {
				...state,
				removeIsLoading: false
			}
		case TYPE.REMOVE_COLLABORATOR_FAILURE:
			return {
				...state,
				removeIsLoading: false
			}
		default:
			return state
	}
}

export default reducer
