import * as TYPE from './elementsTypes'

export const addNode_Main = (node) => (dispatch) => {
	dispatch(addNodeAction(node))
}

export const addNodeBroadcast_Main = (node) => (dispatch) => {
	dispatch(addNodeBroadcastAction(node))
}

export const removeElements_Main = (data) => (dispatch) => {
	dispatch(removeElementsAction(data))
}

export const updatePos_Main = (node) => (dispatch) => {
	dispatch(updatePosAction(node))
}

export const onConnectSend_Main = (edge) => (dispatch) => {
	dispatch(onConnectSendAction(edge))
}

export const onConnectReceive_Main = (edge) => (dispatch) => {
	dispatch(onConnectReceiveAction(edge))
}

// Text Change
export const onTextChange_Main = (data) => (dispatch) => {
	dispatch(onTextChangeAction(data))
}

const addNodeAction = (data) => {
	return {
		type: TYPE.ADD_NODE,
		payload: data
	}
}

const addNodeBroadcastAction = (data) => {
	return {
		type: TYPE.ADD_NODE_BROADCAST,
		payload: data
	}
}

const updatePosAction = (data) => {
	return {
		type: TYPE.UPDATE_POS,
		payload: data
	}
}

const onConnectSendAction = (data) => {
	return {
		type: TYPE.ON_CONNECT_SEND,
		payload: data
	}
}

const onConnectReceiveAction = (data) => {
	return {
		type: TYPE.ON_CONNECT_RECEIVE,
		payload: data
	}
}

const removeElementsAction = (data) => {
	return {
		type: TYPE.REMOVE_ELEMENTS_MAIN,
		payload: data
	}
}

const onTextChangeAction = (data) => {
	return {
		type: TYPE.NODE_TEXT_CHANGE,
		payload: data
	}
}
