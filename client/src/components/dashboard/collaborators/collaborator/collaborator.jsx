import React from 'react'
import { connect } from 'react-redux'
import '../../../../sass/collaborator.scss'

import { actionCollaborator } from '../../../../redux/collaborator/collaboratorActions'

import RemoveUser from '../../../../img/remove-user.svg'
import UserImg from '../../../../img/user-img-placeholder.svg'

function Collaborator({ collaborator_email, idea_board_id, actionCollaborator }) {
	const removeHandler = () => {
		console.log(collaborator_email, idea_board_id)

		actionCollaborator({
			action: 'remove-collaborator',
			collaborator_email,
			idea_board_id: idea_board_id.toString()
		})
	}

	return (
		<div className='collaborator'>
			<div className='collaborator-pic'>
				<img src={UserImg} alt='' title='' />
			</div>
			<div className='collaborator-email'>
				<h2>{collaborator_email}</h2>
			</div>
			<div className='collaborator-remove-user'>
				<img src={RemoveUser} alt='Remove User' title='Remove User' onClick={() => removeHandler()} />
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps, { actionCollaborator })(Collaborator)
