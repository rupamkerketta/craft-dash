import api from '../../utils/api'

import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './signupTypes'

export const signupAttempt = (username, email, password) => async (dispatch) => {
	const body = { username, email, password }
	dispatch(signupRequest())
	try {
		const res = await api.post('/user/create-new-user', body)
		dispatch(signupSuccess(res.data))
		window.location.reload()
		console.log(res.data)
	} catch (e) {
		dispatch(signupFailure())
		console.log(e.response.data)
	}
}

const signupRequest = () => {
	return {
		type: SIGNUP_REQUEST
	}
}

const signupSuccess = (userData) => {
	return {
		type: SIGNUP_SUCCESS,
		payload: userData
	}
}

const signupFailure = (error) => {
	return {
		type: SIGNUP_FAILURE,
		payload: error
	}
}
