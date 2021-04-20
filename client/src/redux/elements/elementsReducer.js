import React from 'react'
import * as TYPE from './elementsTypes'
import update from 'immutability-helper'

import BrandLogo from '../../components/brand-logo/brand-logo'
import { element } from 'prop-types'

// const initialState = [
// 	{
// 		id: '1',
// 		data: {
// 			label: (
// 				<>
// 					<div className='img-wrapper' style={{ width: '400px' }}>
// 						<img
// 							style={{ width: '100%' }}
// 							src={
// 								'http://localhost:5000/api/cloud-storage/get-file/1614766057143.svg'
// 							}
// 							alt='123'
// 						/>
// 					</div>
// 				</>
// 			)
// 		},
// 		type: 'default',
// 		style: {
// 			backgroundColor: '#ffffff',
// 			color: 'black',
// 			fontFamily: 'Poppins',
// 			fontWeight: '400',
// 			minWidth: '500px',
// 			maxWidth: '800px',
// 			maxHeight: '700px',
// 			wordBreak: 'break-word'
// 		},
// 		position: { x: 0, y: 0 }
// 	}
// ]

const initialState = []

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.ADD_NODE:
			return [...state, action.payload]

		case TYPE.ADD_NODE_BROADCAST:
			return [...state, action.payload]

		case TYPE.REMOVE_ELEMENTS_MAIN:
			// return Object.assign([], action.payload.filter)
			// state.splice(removeElement(state, action.payload), 1)
			// // return state
			// console.log(state)
			// console.log(action.payload)

			const state_ids = state.map((element) => element.id)
			const payload_ids = action.payload.map((element) => element.id)

			console.log(state_ids)
			console.log(payload_ids)

			let index = -1

			for (let i = 0; i < state_ids.length; i++) {
				if (!payload_ids.includes(state_ids[i])) {
					index = i
					break
				}
			}

			if (index !== -1) {
				state.splice(index, 1)
			}
			console.log(state)

			// if (action.payload.length === 0) {
			// 	return []
			// } else {
			// 	return state.map((element) => {
			// 		for (let i = 0; i < action.payload.length; i++) {
			// 			if (element.id === action.payload[i].id) {
			// 				return element
			// 			}
			// 		}
			// 	})
			// }
			// state = [...action.payload]
			return Object.assign([], state)
		// return action.payload
		// const i = removeElement(state, action.payload)

		// let arr = []
		// const result = () => {
		// 	for (let i = 0; i < action.payload.length; i++){
		// 		for (let ii = 0; i < state.length; i++) {
		// 			if (action.payload[i].id === state[ii].id) {
		// 				arr.push()
		// 			}
		// 		}
		// 	 }
		// }

		// const difference = state.includes(
		// 	(element) => !action.payload.includes(element)
		// )
		// console.log(difference)
		// return [
		// 	...state.includes((element) => action.payload.includes(element)),
		// 	...difference
		// ]

		case TYPE.UPDATE_POS:
			for (let i = 0; i < state.length; i++) {
				if (state[i].id === action.payload.id) {
					state[i].position = action.payload.position
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
