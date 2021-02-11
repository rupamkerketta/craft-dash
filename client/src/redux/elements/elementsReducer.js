import React from 'react'
import * as TYPE from './elementsTypes'
import update from 'immutability-helper'

import BrandLogo from '../../components/brand-logo/brand-logo'

const initialState = [
	{
		id: '1',
		data: {
			label: (
				<>
					<BrandLogo
						fontStyles={{
							fontSize: '1.2em',
							marginLeft: '10px',
							color: '#000000'
						}}
					/>
				</>
			)
		},
		type: 'default',
		style: {
			backgroundColor: '#ffffff',
			color: 'black',
			fontFamily: 'Poppins',
			fontWeight: '400',
			minWidth: '100px',
			maxWidth: '400px',
			wordBreak: 'break-word'
		},
		position: { x: 0, y: 0 }
	}
]

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.ADD_NODE:
			return [...state, action.payload]

		case TYPE.ADD_NODE_BROADCAST:
			return [...state, action.payload]

		case TYPE.REMOVE_ELEMENTS_MAIN:
			return Object.assign([...action.payload])

		case TYPE.UPDATE_POS:
			for (let i = 0; i < state.length; i++) {
				if (state[i].id === action.payload.id) {
					state[i] = action.payload
					break
				}
			}
			return Object.assign([...state])

		case TYPE.ON_CONNECT_SEND:
			return Object.assign([...action.payload])

		case TYPE.ON_CONNECT_RECEIVE:
			return [...state, action.payload]

		case TYPE.NODE_TEXT_CHANGE:
			console.log(action.payload.text)
			// const newState = update(state, {
			// 	state.findIndex((element) => element.id === action.payload.id) : { data: { label: { $set: action.payload.text } } }
			// })

			// const index = state.findIndex(
			// 	(element) => element.id === action.payload.id
			// )

			const partialState = state.filter(
				(element) => element.id !== action.payload.id
			)
			const node = state.find((element) => element.id === action.payload.id)

			const updatedNode = update(node, {
				data: { label: { $set: action.payload.text } }
			})

			if (state.length === 1) {
				return [{ ...updatedNode }]
			} else {
				return [...partialState, updatedNode]
			}

		default:
			return state
	}
}

export default reducer
