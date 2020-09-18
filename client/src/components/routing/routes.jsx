import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './private-route'

// Components
import Dashboard from '../dashboard/dashboard'
import Register from '../auth/register'
import Login from '../auth/login'

const Routes = (props) => {
	return (
		<React.Fragment>
			<Route exact path='/signup' component={Register} />
			<Route exact path='/login' component={Login} />
			<PrivateRoute exact path='/' component={Dashboard} />
			<PrivateRoute exact path='/dashboard' component={Dashboard} />
		</React.Fragment>
	)
}

export default Routes
