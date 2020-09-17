import api from '../../utils/api'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './loginTypes'

export const attemptLogin = (username, password) => async (dispatch) => {
	const body = { username, password }
	dispatch(loginRequest())
	try {
		const message = await api.post('/user/login', body)
		console.log(message)
		dispatch(loginSuccess(message.data))
	} catch (e) {
		console.log(e.message)
		dispatch(loginFailure(e.message))
	}
}

const loginRequest = () => {
	return {
		type: LOGIN_REQUEST
	}
}

const loginSuccess = (message) => {
	return {
		type: LOGIN_SUCCESS,
		payload: message
	}
}

const loginFailure = (error) => {
	return {
		type: LOGIN_FAILURE,
		payload: error
	}
}
