import { combineReducers } from 'redux'

import loginReducer from './login/loginReducer'
import logoutReducer from './logout/logoutReducer'
import signupReducer from './signup/signupReducer'
import userReducer from './user/userReducer'
import ideaBoardsReducer from './idea-boards/ideaBoardsReducer'
import collaboratorReducer from './collaborator/collaboratorReducer'
import chatReducer from './chat/chatReducer'
import roomReducer from './room/roomReducer'
import elementsReducer from './elements/elementsReducer'
import focusReducer from './elements/focus-elements/focusElementsReducer'
import sideBarReducer from './sidebar/sideBarReducer'
import focusTextReducer from './elements/focus-text/focusTextReducer'
import videoReducer from './video/videoReducer'
import viewFileReducer from './view-file/viewFilesReducer'

const rootReducer = combineReducers({
	auth: loginReducer,
	signup: signupReducer,
	logout: logoutReducer,
	user: userReducer,
	idea_boards: ideaBoardsReducer,
	collaborator: collaboratorReducer,
	chat: chatReducer,
	room: roomReducer,
	elements: elementsReducer,
	focus: focusReducer,
	sidebar_focus: sideBarReducer,
	focus_text: focusTextReducer,
	video: videoReducer,
	viewFile: viewFileReducer
})

export default rootReducer
