import * as TYPE from './updateListTypes'

// API
import api from '../../utils/api'

export const updateList = (id) => async (dispatch) => {
	try {
		const files_info = await api.post('/cloud-storage/get-files-info', {
			idea_board_id: id
		})
		console.log(files_info)
		dispatch({ type: TYPE.UPDATE_LIST, payload: files_info.data })
	} catch (err) {
		console.log(err)
		dispatch({ type: TYPE.UPDATE_LIST, payload: [] })
	}
}
