import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// Loading Page
import LoadingPage from '../loading-page/loading-page'

// Style
import './landing-page.scss'

const LandingPage = ({ auth }) => {
	return (
		<div className='landing-page'>
			{!auth.isAuthenticated && auth.loading ? (
				<LoadingPage />
			) : !auth.isAuthenticated ? (
				<h1>Landing Page</h1>
			) : (
				<Redirect to='/dashboard' />
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, {})(LandingPage)
