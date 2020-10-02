import * as TYPE from './chatTypes'

const addMessage = ({ username, message }) => (dispatch) => {
	dispatch(add_msg(username, msg))
}

const add_msg = () => {
	return {
		type: TYPE.ADD_MESSAGE
	}
}
