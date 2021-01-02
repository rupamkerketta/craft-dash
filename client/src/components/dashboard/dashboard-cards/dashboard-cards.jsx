import React from 'react'
import { Link } from 'react-router-dom'
import './dashboard-cards.scss'

// Craft Dash Logo
import CraftDashLogo from '../../../img/craft-dash-logo.svg'
import Owner from '../../../img/user-img-placeholder.svg'
import Delete from '../../../img/trash.svg'
import Edit from '../../../img/edit.svg'
import Rocket from '../../../img/rocket-2.svg'

function DashboardCards(props) {
	return (
		<div className='dashboard-cards'>
			<div className='cards'>
				<div className='card'>
					<h1 className='main'>
						<div className='logo-wrapper'>
							<img src={CraftDashLogo} alt='' />
						</div>
					</h1>
					<div className='footer'>
						<div className='idea-board-title'>
							<h1>{props.title}</h1>
							<div className='actions'>
								<img
									className='delete'
									src={Delete}
									alt='Delete'
									title='Delete'
									onClick={() =>
										props.deleteHandler(props._id, props.title, true)
									}
								/>
								<img
									className='edit'
									src={Edit}
									alt='Delete'
									title='Edit'
									onClick={() =>
										props.editHandler(props._id, props.title, true)
									}
								/>

								<Link to={`/main/${props._id}`} className='rocket-wrapper'>
									<img
										className='rocket'
										src={Rocket}
										alt='Open'
										title='Open'
									/>
								</Link>
							</div>
						</div>
						<div className='idea-board-owner'>
							<img src={Owner} alt='' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DashboardCards
