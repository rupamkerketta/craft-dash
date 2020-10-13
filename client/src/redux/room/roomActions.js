import * as TYPE from './roomTypes'

// Notitications
import notify from '../../utils/notifications/notify'
import * as NOTIFICATION_TYPE from '../../utils/notifications/notifyTypes'

export const setIdRoom = (id) => (dispatch) => {
	dispatch(setId(id))
}

export const addUsersRoom = (users) => (dispatch) => {
	dispatch(addUsers(users))
}

// When a new user connects
export const addNewUserRoom = (user) => (dispatch) => {
	dispatch(addNewUser(user))
	notify({ username: user.username, enter: true, message: 'joined the session.' }, NOTIFICATION_TYPE.DARK, 'zoom', {
		autoClose: 3000,
		position: 'bottom-left'
	})
}

// When a user disconnects
export const removeUserRoom = (user) => (dispatch) => {
	dispatch(removeUser(user))
	notify({ username: user.username, enter: false, message: 'left the session.' }, NOTIFICATION_TYPE.DARK, 'zoom', {
		autoClose: 3000,
		position: 'bottom-left'
	})
}

const setId = (data) => {
	return {
		type: TYPE.SET_ROOM_ID,
		payload: data
	}
}

const addUsers = (data) => {
	return {
		type: TYPE.ADD_USERS,
		payload: data
	}
}

const addNewUser = (data) => {
	return {
		type: TYPE.ADD_USER,
		payload: data
	}
}

const removeUser = (data) => {
	return {
		type: TYPE.REMOVE_USER,
		payload: data
	}
}
