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

		console.log(res.data)
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
		notify(`IdeaBoard - ${res.data.idea_board_name} created successfully.`, NOTIFICATION_TYPE.INFO, 3000)
		console.log(res.data)
	} catch (e) {
		if (e.response) {
			dispatch(ibCreateFailure(e.response.data))
		} else {
			dispatch(ibCreateFailure(e.message))
		}
		notify('Unable to perform the create action.', NOTIFICATION_TYPE.INFO, 3000)
		console.log(e)
	}
}

export const deleteIBS = (board_id) => async (dispatch) => {
	dispatch(ibDeleteRequest())
	try {
		const res = await api.delete(`/idea-board/delete-board/${board_id}`)
		dispatch(ibDeleteSuccess(res.data.info))
		if (refreshIBS('DELETE')) {
			console.log(res.data)
			dispatch(removeBoard(res.data.info._id))
		}
		notify(`${res.data.message}`, NOTIFICATION_TYPE.INFO, 3000)
	} catch (e) {
		if (e.response) {
			dispatch(ibDeleteFailure(e.response.data))
		} else {
			dispatch(ibDeleteFailure(e.message))
		}
		notify('Unable to perform the delete action.', NOTIFICATION_TYPE.ERROR, 3000)
		console.log(e)
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
			console.log(`[REFRESH - NEW] No new changes`)
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
			console.log(`[REFRESH - DELETE] No new changes`)
			return false
		} else {
			if (board_ids.includes(delete_board_id)) {
				return true
			} else {
				return false
			}
			// const boards_updated = state.boards.data.filter((board) => board._id !== delete_board_id)
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
