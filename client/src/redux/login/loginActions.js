import api from '../../utils/api'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './loginTypes'
import { SET_USER } from '../user/userTypes'

// Notification
import * as TYPE from '../../utils/notifications/notifyTypes'
import notify from '../../utils/notifications/notify'

export const attemptLogin = (username, password) => async (dispatch) => {
	const body = { username, password }
	dispatch(loginRequest())
	try {
		const res = await api.post('/user/login', body)
		console.log(res)
		const { username, email, message } = res.data
		dispatch(loginSuccess(message))
		dispatch(setUser(username, email))
	} catch (e) {
		console.log(e.message)
		dispatch(loginFailure(e.message))
		notify('Invalid username or password', TYPE.ERROR)
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

const setUser = (username, email) => {
	return {
		type: SET_USER,
		payload: { username, email }
	}
}
