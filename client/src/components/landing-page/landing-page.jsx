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

// const About = () => {
// 	return (
// 		<div>
// 			<div className='logo'>
// 				<img src={CDLogo} alt='LogoWithLight' />
// 				<p>
// 					A web application which allows you to Create IdeaBoard Host Meetings
// 					Note Creation, Mind-mapping Real-time group chats (Video and Text)
// 					Polling on Ideas Task Planning or Roadmap for a particular topic for
// 					any subject Role-Based Activities and Privileges Voice Notes File
// 					Sharing (Images, Videos, Text Files, etc.)
// 				</p>
// 			</div>
// 			<div className='row-12'>
// 				<table>
// 					<tr>
// 						<div className='tech-logos'>
// 							<img src={NodeJs}></img>
// 							<img src={ReactLogo}></img>
// 							<img src={GitHub}></img>
// 							<img src={Firebase}></img>
// 							<img src={Figma}></img>
// 							<img src={Express}></img>
// 							<img src={Redux}></img>
// 							<img src={WebRTC}></img>
// 							<img src={MongoDB}></img>
// 							<img src={Socket}></img>
// 							<img src={Sass}></img>
// 						</div>
// 					</tr>
// 					<tr>
// 						<p>Created by Rupam Kerketta & Vishnu Jayakumar</p>
// 					</tr>
// 					<tr>
// 						<p>© 2021</p>
// 					</tr>
// 				</table>
// 			</div>
// 		</div>
// 	)
// }

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, {})(LandingPage)
