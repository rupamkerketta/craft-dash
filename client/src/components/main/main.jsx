import React, { useEffect, useState, Fragment } from 'react'
import '../../sass/main.scss'

// Components
import Messaging from './messaging/messaging'
import TopNavMain from './top-nav-main/top-nav-main'
import MainBoard from './main-board/main-board'

import io from 'socket.io-client'
import { server } from '../../utils/api'

function Main({ match }) {
	const [ socket, setSocket ] = useState(null)

	useEffect(() => {
		console.log(match)
		const s = io(server)
		setSocket(s)
	}, [])

	return (
		<div className='main'>
			<div className='top-nav-wrapper'>
				<TopNavMain />
			</div>
			{socket ? (
				<Fragment>
					<div className='main-board-wrapper'>
						<MainBoard room={match.params.id} socket={socket} />
					</div>
					<div className='messaging-wrapper'>
						<Messaging room={match.params.id} socket={socket} />
					</div>
				</Fragment>
			) : null}
		</div>
	)
}

export default Main
