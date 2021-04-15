import * as TYPE from './viewFileTypes'

export const viewFileInfo = ({
	file_name,
	file_type,
	file_thumbnail,
	original_file_name
}) => (dispatch) => {
	dispatch({
		type: TYPE.VIEW_FILE_INFO,
		payload: {
			file_name,
			file_type,
			file_thumbnail,
			original_file_name
		}
	})
}

export const hideFileInfo = () => (dispatch) => {
	dispatch({
		type: TYPE.HIDE_FILE_INFO
	})
}
