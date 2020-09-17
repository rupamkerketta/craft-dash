import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import './sass/App.scss'

// Store 🏪
import store from './redux/store'

// Components
import Routes from './components/routing/routes'
import { loadUser } from './redux/user/userActions'

function App() {
	useEffect(() => {
		store.dispatch(loadUser())
	}, [])

	return (
		<Provider store={store}>
			<Router>
				<div className='App'>
					<Switch>
						<Routes />
					</Switch>
				</div>
			</Router>
		</Provider>
	)
}

export default App
