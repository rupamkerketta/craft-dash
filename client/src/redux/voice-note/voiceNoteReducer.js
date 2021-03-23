import * as TYPE from './voiceNoteTypes'

const initialState = {
	show_vn_modal: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.VIEW_VOICE_NOTE_MODAL:
			return {
				show_vn_modal: true
			}
		case TYPE.HIDE_VOICE_NOTE_MODAL:
			return {
				show_vn_modal: false
			}
		default:
			return state
	}
}

export default reducer
