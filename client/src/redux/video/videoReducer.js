import * as TYPE from './videoTypes'

const initialState = {
	videoFullMode: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.FULL_MODE_OFF:
			return {
				videoFullMode: false
			}
		case TYPE.FULL_MODE_ON:
			return {
				videoFullMode: true
			}
		default:
			return state
	}
}

export default reducer
