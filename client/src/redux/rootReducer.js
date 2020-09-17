import { combineReducers } from 'redux'
import loginReducer from './login/loginReducer'
import signupReducer from './signup/signupReducer'

const rootReducer = combineReducers({
	auth: loginReducer,
	signup: signupReducer
})

export default rootReducer
