import * as TYPE from './updateListTypes'

const initialState = []

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.UPDATE_LIST:
			const temp = []
			return Object.assign(temp, action.payload.reverse())
		default:
			return state
	}
}

export default reducer
