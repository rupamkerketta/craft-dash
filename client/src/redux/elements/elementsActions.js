import * as TYPE from './elementsTypes'

export const addNode_Main = (node) => (dispatch) => {
	dispatch(addNodeAction(node))
}

export const addNodeBroadcast_Main = (node) => (dispatch) => {
	dispatch(addNodeBroadcastAction(node))
}

export const removeNode_Main = (data) => (dispatch) => { 
	dispatch(removeNodeAction(data))
}

export const removeNodeBroadcast_Main = (data) => dispatch => { 
	dispatch(removeNodeBroadcastAction(data))
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

const removeNodeAction = (data) => { 
	return {
		type: TYPE.REMOVE_NODE,
		payload: data
	}
}

const removeNodeBroadcastAction = (data) => { 
	return {
		type: TYPE.REMOVE_NODE_BROADCAST,
		payload: data
	}
}