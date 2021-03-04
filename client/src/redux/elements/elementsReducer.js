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
					<div className='img-wrapper' style={{ width: '400px' }}>
						<img
							style={{ width: '100%' }}
							src='http://localhost:5000/api/cloud-storage/get-file/1614621965116.jpeg'
							alt='123'
						/>
					</div>
				</>
			)
		},
		type: 'default',
		style: {
			backgroundColor: '#ffffff',
			color: 'black',
			fontFamily: 'Poppins',
			fontWeight: '400',
			minWidth: '500px',
			maxHeight: '700px',
			wordBreak: 'break-word'
		},
		position: { x: 0, y: 0 }
	}
]

// const initialState = []

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
