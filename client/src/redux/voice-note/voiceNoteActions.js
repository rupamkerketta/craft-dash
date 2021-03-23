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
