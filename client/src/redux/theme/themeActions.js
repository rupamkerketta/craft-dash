import * as TYPE from './themeTypes'

export const setLightTheme = () => (dispatch) => {
	dispatch({
		type: TYPE.SET_LIGHT_THEME
	})
}

export const setDarkTheme = () => (dispatch) => {
	dispatch({
		type: TYPE.SET_DARK_THEME
	})
}
