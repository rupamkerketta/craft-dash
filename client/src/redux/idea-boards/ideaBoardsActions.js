import api from '../../utils/api'
import * as TYPE from './ideaBoardsTypes'

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
			dispatch(ibsFailure(e.response.data))
		}
	}
}

export const createIBS = () => async (dispatch) => {}

export const deleteIBS = () => async (dispatch) => {}

export const editIBS = () => async (dispatch) => {}

export const refreshIBS = () => async (dispatch) => {}

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

const ibCreate = (data) => {
	return {
		type: TYPE.IB_CREATE,
		payload: data
	}
}
