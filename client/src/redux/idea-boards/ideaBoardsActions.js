import store from '../store'

import api from '../../utils/api'
import * as TYPE from './ideaBoardsTypes'

import * as NOTIFICATION_TYPE from '../../utils/notifications/notifyTypes'
import notify from '../../utils/notifications/notify'

export const loadIBS = () => async (dispatch) => {
	dispatch(ibsRequest())
	try {
		const res = await api.get('/idea-board/get-idea-boards')
		if (res.data.message && res.data.message === 'NRF') {
			dispatch(ibsEmpty(res.data))
		} else {
			dispatch(ibsSuccess(res.data))
		}

		// console.log(res.data)
	} catch (e) {
		if (e.response) {
			dispatch(ibsFailure(e.response.data))
		} else {
			dispatch(ibsFailure(e.message))
		}
	}
}

export const createIBS = (data) => async (dispatch) => {
	dispatch(ibCreateRequest())
	try {
		const res = await api.post('/idea-board/create-new-idea-board', data)
		dispatch(ibCreateSuccess(res.data))
		if (refreshIBS('NEW')) {
			dispatch(addNewBoard(res.data))
		}

		notify(
			{
				message: `IdeaBoard - ${res.data.idea_board_name} created successfully.`
			},
			NOTIFICATION_TYPE.INFO,
			'zoom',
			{
				autoClose: 3000,
				position: 'top-right'
			}
		)
	} catch (e) {
		if (e.response) {
			dispatch(ibCreateFailure(e.response.data))
		} else {
			dispatch(ibCreateFailure(e.message))
		}

		notify(
			{ message: 'Unable to perform the create action.' },
			NOTIFICATION_TYPE.WARNING,
			'zoom',
			{
				autoClose: 3000,
				position: 'top-right'
			}
		)
	}
}

export const deleteIBS = (board_id) => async (dispatch) => {
	dispatch(ibDeleteRequest())
	try {
		const res = await api.delete(`/idea-board/delete-board/${board_id}`)

		dispatch(ibDeleteSuccess(res.data.info))

		if (refreshIBS('DELETE')) {
			dispatch(removeBoard(res.data.info._id))
		}

		notify({ message: `${res.data.message}` }, NOTIFICATION_TYPE.INFO, 'zoom', {
			autoClose: 3000,
			position: 'top-right'
		})
	} catch (e) {
		if (e.response) {
			dispatch(ibDeleteFailure(e.response.data))
		} else {
			dispatch(ibDeleteFailure(e.message))
		}
		notify(
			{ message: 'Unable to perform the delete action.' },
			NOTIFICATION_TYPE.ERROR,
			'zoom',
			{
				autoClose: 3000,
				position: 'top-right'
			}
		)
	}
}

export const editIBS = () => async (dispatch) => {}

const refreshIBS = (checkFor) => {
	const state = store.getState().idea_boards
	const board_ids = state.boards.data.map((board) => board._id)

	if (checkFor === 'NEW') {
		console.log(state)

		// New Board Check
		let new_board_id

		if (state.new_board.info._id) {
			new_board_id = state.new_board.info._id
		} else {
			new_board_id = -1
		}

		if (new_board_id === -1) {
			// Do Nothing
			return false
		} else {
			if (!board_ids.includes(new_board_id)) {
				return true
			} else {
				return false
			}
		}
	}

	if (checkFor === 'DELETE') {
		// Delete Board Check
		let delete_board_id

		if (state.delete_board.info._id) {
			delete_board_id = state.delete_board.info._id
		} else {
			delete_board_id = -1
		}

		if (delete_board_id === -1) {
			// Do Nothing
			return false
		} else {
			if (board_ids.includes(delete_board_id)) {
				return true
			} else {
				return false
			}
		}
	}
}

// ADD NEW BOARD
const addNewBoard = (data) => {
	return {
		type: TYPE.ADD_NEW_BOARD,
		payload: data
	}
}

// REMOVE A BOARD
const removeBoard = (data) => {
	return {
		type: TYPE.REMOVE_BOARD,
		payload: data
	}
}

// READ
const ibsRequest = () => {
	return {
		type: TYPE.IBS_REQUEST
	}
}
const ibsSuccess = (data) => {
	return {
		type: TYPE.IBS_SUCCESS,
		payload: data
	}
}
const ibsEmpty = () => {
	return {
		type: TYPE.IBS_EMPTY
	}
}
const ibsFailure = (error) => {
	return {
		type: TYPE.IBS_FAILURE,
		payload: error
	}
}

// CREATE
const ibCreateRequest = () => {
	return {
		type: TYPE.IB_CREATE_REQUEST
	}
}

const ibCreateSuccess = (data) => {
	return {
		type: TYPE.IB_CREATE_SUCCESS,
		payload: data
	}
}

const ibCreateFailure = (error) => {
	return {
		type: TYPE.IB_CREATE_FAILURE,
		payload: error
	}
}

// DELETE
const ibDeleteRequest = () => {
	return {
		type: TYPE.IB_DELETE_REQUEST
	}
}

const ibDeleteSuccess = (data) => {
	return {
		type: TYPE.IB_DELETE_SUCCESS,
		payload: data
	}
}

const ibDeleteFailure = (error) => {
	return {
		type: TYPE.IB_DELETE_FAILURE,
		payload: error
	}
}
