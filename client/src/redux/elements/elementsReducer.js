import * as TYPE from './elementsTypes'

const initialState = [ { id: '1', type: 'input', data: { label: 'Craft Dash' }, position: { x: 0, y: 0 } } ]

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.ADD_NODE:
			return [ ...state, action.payload ]

		case TYPE.ADD_NODE_BROADCAST:
			return [ ...state, action.payload ]

		case TYPE.UPDATE_POS:
			for (let i = 0; i < state.length; i++) {
				if (state[i].id === action.payload.id) {
					state[i] = action.payload
					break
				}
			}
			return Object.assign([ ...state ])

		case TYPE.ON_CONNECT_SEND:
			return Object.assign([ ...action.payload ])

		case TYPE.ON_CONNECT_RECEIVE:
			return [ ...state, action.payload ]

		default:
			return state
	}
}

export default reducer
