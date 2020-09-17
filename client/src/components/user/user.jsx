import React from 'react'
import '../../sass/user.scss'

// Dummy user pic
import UserPic from '../../img/owner.png'

function User() {
	return (
		<div className='user'>
			<div className='user-pic'>
				<img className='pic' src={UserPic} alt='' />

				<h5>Logout</h5>
			</div>
		</div>
	)
}

export default User
