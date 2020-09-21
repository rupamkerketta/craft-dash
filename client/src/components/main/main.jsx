import React from 'react'
import '../../sass/main.scss'

// Components
import Messaging from './messaging/messaging'
import TopNavMain from './top-nav-main/top-nav-main'
import MainBoard from './main-board/main-board'

function Main() {
	return (
		<div className='main'>
			<div className='top-nav-wrapper'>
				<TopNavMain />
			</div>
			<div className='main-board-wrapper'>
				<MainBoard />
			</div>
			<div className='messaging-wrapper'>
				<Messaging />
			</div>
		</div>
	)
}

export default Main
