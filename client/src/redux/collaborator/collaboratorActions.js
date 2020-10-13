import api from '../../utils/api'

import * as TYPE from './collaboratorTypes'
import { UPDATE_IB_COLLABORATORS_ADD, UPDATE_IB_COLLABORATORS_REMOVE } from '../idea-boards/ideaBoardsTypes'

import * as NOTIFICATION_TYPE from '../../utils/notifications/notifyTypes'
import notify from '../../utils/notifications/notify'

export const actionCollaborator = ({ collaborator_email: email, idea_board_id, action }) => async (dispatch) => {
	// Add Collaborator Action Handlers
	const addRequestHandler = () => {
		dispatch(addCollaboratorRequest())
	}

	const addSuccessHandler = (res) => {
		dispatch(addCollaboratorSuccess())
		dispatch(ibUpdateCollaboratorsAdd({ idea_board_id, new_collaborator: res.data.new_collaborator.email }))

		notify(
			{ message: `Collaborator ${res.data.new_collaborator.email} added successfully!!!` },
			NOTIFICATION_TYPE.INFO,
			'zoom',
			{
				autoClose: 3000,
				position: 'top-right'
			}
		)
	}

	const addErrHandler = () => {
		dispatch(addCollaboratorFailure())
		notify({ message: `Collaborator ERROR!!!` }, NOTIFICATION_TYPE.ERROR, 'zoom', {
			autoClose: 3000,
			position: 'top-right'
		})
	}

	// Remove Collaborator Action Handlers
	const removeRequestHandler = () => {
		dispatch(removeCollaboratorRequest())
	}

	const removeSuccessHandler = (res) => {
		console.log(res.data)
		dispatch(removeCollaboratorSuccess())
		dispatch(
			ibUpdateCollaboratorsRemove({ idea_board_id, removed_collaborator: res.data.removed_collaborator.email })
		)

		notify(
			{ message: `Collaborator ${res.data.removed_collaborator.email} removed successfully!!!` },
			NOTIFICATION_TYPE.INFO,
			'zoom',
			{
				autoClose: 3000,
				position: 'top-right'
			}
		)
	}

	const removeErrHandler = () => {
		dispatch(removeCollaboratorFailure())
		notify({ message: `Collaborator ERROR!!!` }, NOTIFICATION_TYPE.ERROR, 'zoom', {
			autoClose: 3000,
			position: 'top-right'
		})
	}

	switch (action) {
		case 'add-collaborator':
			addRequestHandler()
			break
		case 'remove-collaborator':
			removeRequestHandler()
			break
		default:
			return
	}

	try {
		const res = await api.post('/collaborators', {
			action,
			email,
			idea_board_id
		})

		switch (action) {
			case 'add-collaborator':
				addSuccessHandler(res)
				break
			case 'remove-collaborator':
				removeSuccessHandler(res)
				break
			default:
				return
		}
	} catch (e) {
		console.log(e)
		switch (action) {
			case 'add-collaborator':
				addErrHandler()
				break
			case 'remove-collaborator':
				removeErrHandler()
				break
			default:
				return
		}
	}
}

const addCollaboratorRequest = () => {
	return {
		type: TYPE.ADD_COLLABORATOR_REQUEST
	}
}

const addCollaboratorSuccess = () => {
	return {
		type: TYPE.ADD_COLLABORATOR_SUCCESS
	}
}

const addCollaboratorFailure = () => {
	return {
		type: TYPE.ADD_COLLABORATOR_FAILURE
	}
}

const removeCollaboratorRequest = () => {
	return {
		type: TYPE.REMOVE_COLLABORATOR_REQUEST
	}
}

const removeCollaboratorSuccess = () => {
	return {
		type: TYPE.REMOVE_COLLABORATOR_SUCCESS
	}
}

const removeCollaboratorFailure = () => {
	return {
		type: TYPE.REMOVE_COLLABORATOR_FAILURE
	}
}

const ibUpdateCollaboratorsAdd = (data) => {
	return {
		type: UPDATE_IB_COLLABORATORS_ADD,
		payload: data
	}
}

const ibUpdateCollaboratorsRemove = (data) => {
	return {
		type: UPDATE_IB_COLLABORATORS_REMOVE,
		payload: data
	}
}
