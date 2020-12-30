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
		console.log(res.data)
		const { username, email, message } = res.data
		const thumbnail = res.data.thumbnail || ''

		dispatch(loginSuccess(message))
		dispatch(setUser(username, email, thumbnail))
	} catch (e) {
		console.log(e.message)
		dispatch(loginFailure(e.message))

		notify({ message: 'Invalid username or password' }, TYPE.ERROR, 'zoom', {
			autoClose: 3000,
			position: 'top-right'
		})
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

const setUser = (username, email, thumbnail) => {
	return {
		type: SET_USER,
		payload: { username, email, thumbnail }
	}
}
