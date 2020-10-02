import React, { useEffect } from 'react'
import '../../sass/main.scss'

// Components
import Messaging from './messaging/messaging'
import TopNavMain from './top-nav-main/top-nav-main'
import MainBoard from './main-board/main-board'

import io from 'socket.io-client'
import { server } from '../../utils/api'

function Main({ match }) {
	useEffect(() => {
		console.log(match)
	}, [])

	return (
		<div className='main'>
			<div className='top-nav-wrapper'>
				<TopNavMain />
			</div>
			<div className='main-board-wrapper'>
				<MainBoard />
			</div>
			<div className='messaging-wrapper'>
				<Messaging room={match.params.id} socket={io(server)} />
			</div>
		</div>
	)
}

export default Main
