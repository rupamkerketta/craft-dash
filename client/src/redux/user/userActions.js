import api from '../../utils/api'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOAD_CHECK_FAIL } from '../login/loginTypes'
import { SET_USER } from './userTypes'

export const loadUser = () => async (dispatch) => {
	dispatch(loadRequest())
	try {
		const res = await api.get('/user/me')
		dispatch(loadSuccess())
		const { username, email } = res.data
		dispatch(setUser(username, email))
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

const setUser = (username, email) => {
	return {
		type: SET_USER,
		payload: { username, email }
	}
}
