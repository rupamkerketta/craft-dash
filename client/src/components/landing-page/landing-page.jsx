import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

// Loading Page
import LoadingPage from '../loading-page/loading-page'

// Home
import Home from './home'
import About from './about'
// Style
import './landing-page.scss'
import './about.scss'

function LandingPage({ match, auth }) {
	React.useEffect(() => {
		console.log('[useEffect]')
		console.log(match)
	}, [])
	return (
		<div className='landing-page'>
			{!auth.isAuthenticated && auth.loading ? (
				<LoadingPage />
			) : !auth.isAuthenticated ? (
				<LandingPageContent match={match} />
			) : (
				// <h1>LandingPage</h1>
				<Redirect to='/dashboard' />
			)}
		</div>
	)
}
const LandingPageContent = () => {
	const [isHome, setIsHome] = React.useState(true)
	return (
		<div className='landing-page-content'>
			<div className='navbar'>
				<div className='left-contents'>
					<div className='content'>
						<h4
							onClick={() => setIsHome(true)}
							style={{
								borderBottom: `3px solid ${isHome ? '#3FDE9C' : 'transparent'}`,
								cursor: 'pointer'
							}}>
							Home
						</h4>
					</div>
					<div className='content'>
						<h4
							onClick={() => setIsHome(false)}
							style={{
								borderBottom: `3px solid ${isHome ? 'transparent' : '#3FDE9C'}`,
								cursor: 'pointer'
							}}>
							About
						</h4>
					</div>
				</div>

				<div className='right-contents'>
					<div className='content'>
						<Link to='/signup'>
							<button className='sign-up-btn'>Sign Up</button>
						</Link>
					</div>
					<div className='content'>
						<Link to='/login'>
							<button className='login-btn'>Login</button>
						</Link>
					</div>
				</div>
			</div>
			<div className='landing-wrapper'>{isHome ? <Home /> : <About />}</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, {})(LandingPage)
