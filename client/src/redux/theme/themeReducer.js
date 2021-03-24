import * as TYPE from './themeTypes'

const initialState = 'dark'

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPE.SET_DARK_THEME:
			localStorage.setItem('theme', 'dark')
			return 'dark'
		case TYPE.SET_LIGHT_THEME:
			localStorage.setItem('theme', 'light')
			return 'light'
		default:
			return state
	}
}

export default reducer
