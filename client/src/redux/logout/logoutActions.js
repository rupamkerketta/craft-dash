import api from '../../utils/api'

import * as TYPE from './logoutTypes'

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
		type: TYPE.LOGOUT_REQUEST
	}
}

const logoutSuccess = () => {
	return {
		type: TYPE.LOGOUT_SUCCESS
	}
}

const logoutFailure = () => {
	return {
		type: TYPE.LOGOUT_FAILURE
	}
}
