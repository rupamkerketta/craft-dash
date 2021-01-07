import React, { useEffect } from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import './sass/App.scss'

// Store 🏪
import store from './redux/store'

// Components
import Routes from './components/routing/routes'
import { loadUser } from './redux/user/userActions'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	useEffect(() => {
		if (!(window.location.hostname === 'www.craftdash.xyz')) {
			window.location.hostname = 'https://www.craftdash.xyz'
		}
		store.dispatch(loadUser())
		console.log('[CraftDash]')
	}, [])

	return (
		<Provider store={store}>
			<Router>
				<div className='App'>
					<ToastContainer />
					<Switch>
						<Routes />
					</Switch>
				</div>
			</Router>
		</Provider>
	)
}

export default App
