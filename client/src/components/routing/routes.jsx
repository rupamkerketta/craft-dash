import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from './private-route'

// Components
import LandingPage from '../landing-page/landing-page'
import Dashboard from '../dashboard/dashboard'
import Main from '../main/main'
import Register from '../auth/register/register'
import Login from '../auth/login/login'
import ProfilePage from '../profile-page/profile-page'
import CloudStorage from '../main/cloud/cloud-storage'

const Routes = (props) => {
	return (
		<React.Fragment>
			<Route exact path='/landing-page' component={LandingPage} />
			<Route exact path='/signup' component={Register} />
			<Route exact path='/login' component={Login} />
			<PrivateRoute exact path='/main/:id' component={Main} />
			<PrivateRoute exact path='/profile-page' component={ProfilePage} />
			<PrivateRoute exact path='/' component={Dashboard} />
			<PrivateRoute exact path='/dashboard' component={Dashboard} />
			<PrivateRoute path='/craft-dash-cloud/:id' component={CloudStorage} />
		</React.Fragment>
	)
}

export default Routes
