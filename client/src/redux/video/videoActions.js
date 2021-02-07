import * as TYPE from './videoTypes'

export const enableFullMode = () => (dispatch) => {
	dispatch({
		type: TYPE.FULL_MODE_ON
	})
}

export const disableFullMode = () => (dispatch) => {
	dispatch({
		type: TYPE.FULL_MODE_OFF
	})
}
