import api from '../../utils/api'

import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from './logoutTypes'

export const logout = () => async (dispatch) => {
	dispatch(logoutRequest())
	try {
		const res = await api.get('/user/logout')
		console.log(res.data)

		dispatch(logoutSuccess())

		window.location.reload()
	} catch (e) {
		dispatch(logoutFailure())
		if (e.response) {
			console.log(e.response.message)
		} else {
			console.log(e.message)
		}
	}
}

const logoutRequest = () => {
	return {
		type: LOGOUT_REQUEST
	}
}

const logoutSuccess = () => {
	return {
		type: LOGOUT_SUCCESS
	}
}

const logoutFailure = () => {
	return {
		type: LOGOUT_FAILURE
	}
}
