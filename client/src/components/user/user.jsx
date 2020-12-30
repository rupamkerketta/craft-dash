import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../redux/logout/logoutActions'
import './user.scss'

// Dummy user pic
import UserPic from '../../img/user-img-placeholder.svg'

function User({ user, logout }) {
	return (
		<div className='user'>
			<div className='user-pic'>
				<img
					className='pic'
					src={user.thumbnail === '' ? UserPic : user.thumbnail}
					alt={user.username}
					title={user.username}
				/>

				<h5 onClick={() => logout()}>Logout</h5>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, { logout })(User)
