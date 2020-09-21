import api from '../../utils/api'

import * as TYPE from './signupTypes'

import * as NOTIFICATION_TYPE from '../../utils/notifications/notifyTypes'
import notify from '../../utils/notifications/notify'

export const signupAttempt = (username, email, password) => async (dispatch) => {
	const body = { username, email, password }
	dispatch(signupRequest())
	try {
		const res = await api.post('/user/create-new-user', body)
		dispatch(signupSuccess(res.data))
		window.location.reload()
	} catch (e) {
		if (e.response) {
			dispatch(signupFailure(e.response.data.message))
			notify(e.response.data.message, NOTIFICATION_TYPE.ERROR)
			console.log(e.response.data)
		} else {
			dispatch(signupFailure(e.message))
			console.log(e.message)
		}
	}
}

const signupRequest = () => {
	return {
		type: TYPE.SIGNUP_REQUEST
	}
}

const signupSuccess = (userData) => {
	return {
		type: TYPE.SIGNUP_SUCCESS,
		payload: userData
	}
}

const signupFailure = (error) => {
	return {
		type: TYPE.SIGNUP_FAILURE,
		payload: error
	}
}
