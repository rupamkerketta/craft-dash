import api from '../../utils/api'

import * as TYPE from './collaboratorTypes'
import { UPDATE_IB_COLLABORATORS_ADD } from '../idea-boards/ideaBoardsTypes'

import * as NOTIFICATION_TYPE from '../../utils/notifications/notifyTypes'
import notify from '../../utils/notifications/notify'

export const addCollaborator = (collaborator) => async (dispatch) => {
	dispatch(collaboratorRequest())
	const { collaborator_email: email, idea_board_id, action } = collaborator

	try {
		const res = await api.post('/collaborators', {
			action,
			email,
			idea_board_id
		})
		console.log(res.data)
		dispatch(collaboratorSuccess())
		dispatch(ibUpdateCollaborators({ idea_board_id, new_collaborator: res.data.new_collaborator.email }))
		notify(`Collaborator ${res.data.new_collaborator.email} added successfully!!!`, NOTIFICATION_TYPE.INFO, 3000)
	} catch (e) {
		console.log(e)
		dispatch(collaboratorFailure())
		notify(`Collaborator ERROR!!!`, NOTIFICATION_TYPE.ERROR, 3000)
	}
}

const collaboratorRequest = () => {
	return {
		type: TYPE.COLLABORATOR_REQUEST
	}
}

const collaboratorSuccess = () => {
	return {
		type: TYPE.COLLABORATOR_SUCCESS
	}
}

const collaboratorFailure = () => {
	return {
		type: TYPE.COLLABORATOR_FAILURE
	}
}

const ibUpdateCollaborators = (data) => {
	return {
		type: UPDATE_IB_COLLABORATORS_ADD,
		payload: data
	}
}
