import React from 'react'
import './sass/App.scss'

// Components
import Register from './components/auth/register'
import Login from './components/auth/login'
import Dashboard from './components/dashboard/dashboard'

function App() {
	return (
		<div className='App'>
			<Dashboard />
		</div>
	)
}

export default App
