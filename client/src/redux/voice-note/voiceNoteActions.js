import * as TYPE from './voiceNoteTypes'

export const viewVNModal = () => (dispatch) => {
	dispatch({
		type: TYPE.VIEW_VOICE_NOTE_MODAL
	})
}

export const hideVNModal = () => (dispatch) => {
	dispatch({
		type: TYPE.HIDE_VOICE_NOTE_MODAL
	})
}

export const viewFUModal = () => (dispatch) => {
	dispatch({
		type: TYPE.VIEW_FU_MODAL
	})
}

export const hideFUModal = () => (dispatch) => {
	dispatch({
		type: TYPE.HIDE_FU_MODAL
	})
}
