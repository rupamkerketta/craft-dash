import React from 'react'
import BrandLogo from '../brand-logo/brand-logo'
import '../profile-page/profile-page.scss'
import UserPic from '../../img/user-img-placeholder.svg'
import { Link } from 'react-router-dom'
import IdeaBoardsList from '../profile-page/ideaboards-list/ideaboards-list'

import { connect } from 'react-redux'
import { logout } from '../../redux/logout/logoutActions'

function ProfilePage({ idea_boards, user, logout }) {
	return (
		<div className='profile-page-light'>
			<div className='app-bar-light'>
				<div>
					<ul>
						<li className='logo-light'>
							<Link to='/dashboard'>
								<BrandLogo
									fontStyles={{ fontSize: '1.4em', marginLeft: '10px' }}
									logoStyles={{ width: '30px' }}
								/>
							</Link>
						</li>
						<li>
							<button className='logout-button-light' onClick={() => logout()}>
								Logout
							</button>
						</li>
					</ul>
				</div>
			</div>
			<div className='profile-card-light'>
				<div className='user-image-wrapper-light'>
					<img
						className='user-image-light'
						src={user.thumbnail === '' ? UserPic : user.thumbnail}
						alt=''
					/>
				</div>
				<div className='profile-text-content-light'>
					<p className='username-light'>{user.username}</p>
					<p className='email-light'>{user.email}</p>
				</div>
				{/* <p className='subscription'>Subscription Here</p> */}
				{/* <button className='edit-profile-button'>Edit Profile</button> */}
			</div>
			<div className='subscription-card-light'>
				<p className='subscription-header-light'>Active Subscription</p>
				<p className='subscription-plan-light'>₹000/month</p>
				<p className='subscription-date-light'>Active Till: 00/00/0000</p>
				<button className='renew-subscription-button-light'>
					Renew Subscription
				</button>
			</div>
			<div className='active-time-card-light'>
				<p className='active-time-header-light'>Active Time</p>
				<p className='active-time-month-light'>Month of September</p>
			</div>
			<div className='active-ideaboards-card-light'>
				<p className='active-ideaboards-header-light'>Active IdeaBoards</p>
				<div className='active-ideaboards-list-light'>
					{idea_boards.map((idea_board) => (
						<IdeaBoardsList title={idea_board.idea_board_name} />
					))}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		idea_boards: state.idea_boards.boards.data,
		user: state.user
	}
}

export default connect(mapStateToProps, { logout })(ProfilePage)
