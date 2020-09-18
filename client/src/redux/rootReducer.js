import { combineReducers } from 'redux'
import loginReducer from './login/loginReducer'
import logoutReducer from './logout/logoutReducer'
import signupReducer from './signup/signupReducer'
import userReducer from './user/userReducer'

const rootReducer = combineReducers({
	auth: loginReducer,
	signup: signupReducer,
	logout: logoutReducer,
	user: userReducer
})

export default rootReducer
