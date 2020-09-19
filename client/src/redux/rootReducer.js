import { combineReducers } from 'redux'

import loginReducer from './login/loginReducer'
import logoutReducer from './logout/logoutReducer'
import signupReducer from './signup/signupReducer'
import userReducer from './user/userReducer'
import ideaBoardsReducer from './idea-boards/ideaBoardsReducer'

const rootReducer = combineReducers({
	auth: loginReducer,
	signup: signupReducer,
	logout: logoutReducer,
	user: userReducer,
	idea_boards: ideaBoardsReducer
})

export default rootReducer
