import { bindActionCreators } from 'redux'
import * as TYPE from './chatTypes'

export const addMessage = ({ username, message, time, room }) => (dispatch) => {
	dispatch(add_msg({ username, message, time, room }))
}

export const resetMessages = () => (dispatch) => {
	dispatch(reset_msgs())
}

const add_msg = (data) => {
	return {
		type: TYPE.ADD_MESSAGE,
		payload: data
	}
}

const reset_msgs = () => {
	return {
		type: TYPE.RESET_MESSAGES
	}
}
