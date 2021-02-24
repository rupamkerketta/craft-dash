import api from '../../utils/api'

import * as TYPE from './signupTypes'

import * as NOTIFICATION_TYPE from '../../utils/notifications/notifyTypes'
import notify from '../../utils/notifications/notify'

export const signupAttempt = (username, email, password, avatar_id) => async (
	dispatch
) => {
	const body = { username, email, password, avatar_id }
	dispatch(signupRequest())
	try {
		const res = await api.post('/user/create-new-user', body)
		dispatch(signupSuccess(res.data))
		window.location.reload()
	} catch (e) {
		if (e.response) {
			dispatch(signupFailure(e.response.data.message))

			notify(
				{ message: e.response.data.message },
				NOTIFICATION_TYPE.ERROR,
				'zoom',
				{
					autoClose: 3000,
					position: 'top-right'
				}
			)
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
