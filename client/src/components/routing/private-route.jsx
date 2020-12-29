import React from 'react'
import { Route, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingPage from '../loading-page/loading-page'

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
	...rest
}) => {
	const history = useHistory()

	return (
		<Route
			{...rest}
			render={(props) =>
				loading ? (
					<LoadingPage />
				) : isAuthenticated ? (
					<Component {...props} />
				) : (
					history.push('/landing-page')
				)
			}
		/>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
