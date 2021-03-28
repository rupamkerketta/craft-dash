import React, { useState } from 'react'
import BrandLogo from '../brand-logo/brand-logo'

// Styles
import './profile-page.scss'
import './profile-page-light.scss'

// Redux
import { useSelector } from 'react-redux'

// import UserPic from '../../img/user-img-placeholder.svg'
import { Link } from 'react-router-dom'
import IdeaBoardsList from '../profile-page/ideaboards-list/ideaboards-list'

import { connect } from 'react-redux'
import { logout } from '../../redux/logout/logoutActions'
import Avatars from '../avatars/avatars-import'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'

import LightThemeButton from '../../img/light-theme-button.png'
import DarkThemeButton from '../../img/dark-theme-button.png'

function ProfilePage({ idea_boards, user, logout }) {
	const theme = useSelector((state) => state.theme)
	const dark = theme === 'dark'

	const customStyles = {
		wrapper: {
			backgroundColor: '#1F2023',
			background:
				'linear-gradient(144.37deg, rgba(22, 22, 22, 0.86) 0%, rgba(22, 22, 22, 0.757406) 6.67%, rgba(23, 23, 23, 0.749347) 13.33%, rgba(23, 23, 23, 0.635502) 20%, rgba(24, 24, 24, 0.615777) 26.67%, rgba(24, 25, 25, 0.590468) 33.33%, rgba(25, 26, 27, 0.560435) 40%, rgba(26, 27, 28, 0.527193) 46.67%, rgba(27, 28, 29, 0.492807) 53.33%, rgba(28, 29, 31, 0.459565) 60%, rgba(29, 30, 32, 0.429532) 66.67%, rgba(30, 31, 33, 0.404223) 73.33%, rgba(30, 31, 34, 0.384498) 80%, rgba(31, 32, 35, 0.370653) 86.67%, rgba(31, 32, 35, 0.362594) 93.33%, rgba(31, 32, 35, 0.36) 100%)',
			borderLeft: '1px solid rgba(234,236,239, 0.3)',
			borderTop: '1px solid rgba(234,236,239, 0.3)',
			borderRight: '1px solid rgba(234,236,239, 0.2)',
			borderBottom: '1px solid rgba(234,236,239, 0.2)',
			borderRadius: '5px'
		}
	}

	const [avatarModel, avatarModalVisibility] = useState(false)
	const avatars1 = [0, 1, 2, 3, 4, 5]
	const avatars2 = [6, 7, 8, 9, 10, 11]
	const [avatar_id, setAvatarId] = useState(0)
	const avatarHandler = (id) => {
		console.log(`[avatarHandler] ${id}`)
		setAvatarId(id)
	}
	return (
		<div className={`profile-page ${dark ? '' : 'profile-page-light'}`}>
			<div className={`app-bar ${dark ? '' : 'app-bar-light'}`}>
				<div>
					<ul>
						<li className='logo'>
							<Link to='/dashboard'>
								<BrandLogo
									fontStyles={{ fontSize: '1.4em', marginLeft: '10px' }}
									logoStyles={{ width: '30px' }}
								/>
							</Link>
						</li>
						<li>
							<button
								className={`logout-button ${dark ? '' : 'logout-button-light'}`}
								onClick={() => logout()}>
								Logout
							</button>
						</li>
					</ul>
				</div>
			</div>

			<div className={`profile-card ${dark ? '' : 'profile-card-light'}`}>
				<div
					className={`user-image-wrapper ${
						dark ? '' : 'user-image-wrapper-light'
					}`}
					onClick={() => avatarModalVisibility(true)}>
					{/* <img
						className='user-image'
						src={user.thumbnail === '' ? UserPic : user.thumbnail}
						alt=''
					/> */}
					<Avatars
						index={user.avatar_id}
						selected={false}
						avatarHandler={false}
					/>
				</div>
				{/* <div
					className={`profile-text-content ${
						dark ? '' : 'profile-text-content-light'
					}`}> */}
				<div className='profile-text-content'>
					<p className={`username ${dark ? '' : 'username-light'}`}>
						{user.username}
					</p>
					<p className={`email' ${dark ? '' : 'email-light'}`}>{user.email}</p>
				</div>
				{/* <p className='subscription'>Subscription Here</p> */}
				{/* <button className='edit-profile-button'>Edit Profile</button> */}
			</div>
			<Rodal
				className='rodal-bg'
				visible={avatarModel}
				onClose={() => avatarModalVisibility(false)}
				animation='fade'
				width={650}
				height={300}
				customStyles={customStyles.wrapper}>
				<div className='select-avatars-header'>
					<p>Select Avatar</p>
				</div>
				<div className='select-avatars-content'>
					<div className='select-avatars-row1'>
						{avatars1.map((avatar) => {
							return (
								<Avatars
									index={avatar}
									key={avatar}
									selected={avatar == avatar_id}
									avatarHandler={avatarHandler}
								/>
							)
						})}
					</div>
					<div className='select-avatars-row2'>
						{avatars2.map((avatar) => {
							return (
								<Avatars
									index={avatar}
									key={avatar}
									selected={avatar == avatar_id}
									avatarHandler={avatarHandler}
								/>
							)
						})}
					</div>
				</div>
				<div className='select-avatars-button'>
					<button
						className='cancel-button'
						onClick={() => avatarModalVisibility(false)}>
						Cancel
					</button>
					<button className='select-button'>Select</button>
				</div>
			</Rodal>
			<div className='subscription-card'>
				<p className='subscription-header'>Active Subscription</p>
				<p className='subscription-plan'>₹000/month</p>
				<p className='subscription-date'>Active Till: 00/00/0000</p>
				<button className='renew-subscription-button'>
					Renew Subscription
				</button>
			</div>
			<div className='active-time-card'>
				<p className='active-time-header'>Active Time</p>
				<p className='active-time-month'>Month of September</p>
			</div>
			<div className={`appearance-wrapper ${dark ? '' : 'appearance-wrapper'}`}>
				<p
					className={`appearance-header ${
						dark ? '' : 'appearance-header-light'
					}`}>
					Appearance
				</p>
				<div
					className={`appearance-buttons-wrapper ${
						dark ? '' : 'appearance-buttons-wrapper-light'
					}`}>
					<div
						className={`light-theme-button ${
							dark ? '' : 'light-theme-button-light'
						}`}>
						<img src={LightThemeButton} alt='Light Theme' title='Light Theme' />
						<p>Light Theme</p>
					</div>
					<div
						className={`appearance-switch ${
							dark ? '' : 'appearance-switch-light'
						}`}>
						<label className={`switch ${dark ? '' : 'switch'}`}>
							<input type='checkbox' checked={dark} />
							<span className={`slider ${dark ? '' : 'slider'}`} />
						</label>
					</div>
					<div
						className={`dark-theme-button ${
							dark ? '' : 'dark-theme-button-light'
						}`}>
						<img src={DarkThemeButton} alt='Dark Theme' title='Dark Theme' />
						<p>Dark Theme</p>
					</div>
				</div>
			</div>
			<div className='active-ideaboards-card'>
				<p className='active-ideaboards-header'>Active IdeaBoards</p>
				<div
					className={`active-ideaboards-list ${
						dark ? '' : 'active-ideaboards-list-light'
					}`}>
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
