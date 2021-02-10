import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import './mouse-pointers.scss'

function MousePointers({ room, pos_update, data }) {
	const collaborators = data.find((idea_board) => idea_board._id === room)
	const [users, setUsers] = useState(
		collaborators.collaborators.map((collaborator) => {
			const x = pos_update.email === collaborator ? pos_update.pos.x : 0
			const y = pos_update.email === collaborator ? pos_update.pos.y : 0
			return {
				user: collaborator,
				pos: { x: 0, y: 0 }
			}
		})
	)

	useEffect(() => {
		console.log(`[MousePointers] ${data}`)
		console.log(`[MousePointers : users] ${JSON.stringify(users)}`)
		console.log(`[MousePointers : pos_update] ${JSON.stringify(pos_update)}`)
	}, [])

	return (
		<div className='mouse-pointers'>
			{users.map((user) => {
				return (
					<div className='pointer-wrapper' key={user.user}>
						<div
							className='user-pointer'
							style={{ top: `${user.pos.y}px`, left: `${user.pos.x}px` }}></div>
						<div className='user-email-wrapper'>
							<h3 className='user-email'>{user.user}</h3>
						</div>
					</div>
				)
			})}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		data: state.idea_boards.boards.data
	}
}

export default connect(mapStateToProps, {})(MousePointers)
