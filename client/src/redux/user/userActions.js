import api from '../../utils/api'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOAD_CHECK_FAIL } from '../login/loginTypes'

export const loadUser = () => async (dispatch) => {
	dispatch(loadRequest())
	try {
		const res = await api.get('/user/me')
		dispatch(loadSuccess())
		console.log(res)
	} catch (e) {
		dispatch(loadCheckFail())
		console.log(e.message)
	}
}

const loadSuccess = () => {
	return {
		type: LOGIN_SUCCESS
	}
}

const loadRequest = () => {
	return {
		type: LOGIN_REQUEST
	}
}

const loadCheckFail = () => {
	return {
		type: LOAD_CHECK_FAIL
	}
}
