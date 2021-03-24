import api from '../../utils/api'

import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOAD_CHECK_FAIL
} from '../login/loginTypes'
import { SET_USER } from './userTypes'

import * as TYPE from '../theme/themeTypes'

export const loadUser = () => async (dispatch) => {
	dispatch(loadRequest())
	try {
		const res = await api.get('/user/me')
		dispatch(loadSuccess())

		const { username, email, avatar_id } = res.data
		const thumbnail = res.data.thumbnail || ''

		dispatch(setUser(username, email, thumbnail, avatar_id))

		// Theme Dark or Light
		const theme = localStorage.getItem('theme')

		switch (theme) {
			case 'light':
				dispatch({ type: TYPE.SET_LIGHT_THEME })
				break
			case 'dark':
				// Do nothing as the default redux state for the is 'dark'
				break
			default:
				// If the item is not set, theme is set to 'dark' (default)
				localStorage.setItem('theme', 'dark')
		}
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

const setUser = (username, email, thumbnail, avatar_id) => {
	return {
		type: SET_USER,
		payload: { username, email, thumbnail, avatar_id }
	}
}
