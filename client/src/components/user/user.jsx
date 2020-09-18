import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../redux/logout/logoutActions'
import '../../sass/user.scss'

// Dummy user pic
import UserPic from '../../img/owner.png'

function User({ logout }) {
	return (
		<div className='user'>
			<div className='user-pic'>
				<img className='pic' src={UserPic} alt='' />

				<h5 onClick={() => logout()}>Logout</h5>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		userData: {}
	}
}

export default connect(mapStateToProps, { logout })(User)
