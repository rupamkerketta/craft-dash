import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import '../../sass/dashboard.scss'

import Rodal from 'rodal'
import 'rodal/lib/rodal.css'

// API 😄
import { loadIBS, createIBS } from '../../redux/idea-boards/ideaBoardsActions'

// Components
import BrandLogo from '../brand-logo/brand-logo'
import DashboardCards from './dashboard-cards/dashboard-cards'
import User from '../user/user'

// Logos
import AddBtn from '../../img/add-button.svg'
import Idea from '../../img/idea.svg'

const initialValues = {
	idea_board_name: '',
	idea_board_description: ''
}

const validate = (values) => {
	let errors = {}

	if (!values.idea_board_name) {
		errors.idea_board_name = 'Required'
	} else if (values.idea_board_name.length >= 20) {
		errors.idea_board_name = 'Name too long'
	}

	if (!values.idea_board_description) {
		errors.idea_board_description = 'Required'
	} else if (values.idea_board_description.length > 30) {
		errors.ide_board_description = 'Description too long'
	}

	return errors
}

const TextError = (props) => <div className='error-msg'>{props.children}</div>

function Dashboard({ idea_boards, loadIBS, createIBS }) {
	const [ visible, setVisible ] = useState(false)

	useEffect(
		() => {
			document.title = 'Craft Dash | Dashboard'
			loadIBS()
		},
		[ loadIBS ]
	)

	// Modal form onSubmit Handler
	const onSubmit = (values) => {
		console.log(values)
		createIBS(values)
	}

	return (
		<div className='dashboard'>
			<div className='top-nav'>
				<div className='brand-logo-wrapper'>
					<BrandLogo fontStyles={{ fontSize: '1.4em', marginLeft: '10px' }} logoStyles={{ width: '30px' }} />
				</div>
				<div className='add-btn'>
					<img src={AddBtn} onClick={() => setVisible(true)} alt='Create New Idea Board' />
				</div>
				<div className='user-wrapper'>
					<User />
				</div>
			</div>

			<div className='dashboard-title'>
				<h1>Dashboard</h1>
			</div>

			<div className='dashboard-cards-wrapper'>
				{idea_boards.boards.data.length !== 0 ? (
					idea_boards.boards.data.map((idea_board) => {
						return <DashboardCards key={idea_board._id} title={`${idea_board.idea_board_name}`} />
					})
				) : null}
			</div>

			<Rodal
				visible={visible}
				onClose={() => setVisible(false)}
				animation='zoom'
				duration={400}
				width={450}
				height={480}
			>
				<div className='ideaboard-modal'>
					<div className='ideaboard-header'>
						<img src={Idea} alt='Idea' />
						<h1 className='ideaboard-title'>Create New Dashboard</h1>
					</div>
					<div className='idea-board-form'>
						<Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
							{(formik) => {
								return (
									<Form>
										<div className='input-group'>
											<label htmlFor='idea_board_name'>
												IdeaBoard name <span className='asterisk'>*</span>
											</label>
											<Field
												type='text'
												name='idea_board_name'
												id='idea_board_name'
												autoComplete='off'
											/>
											<div className='error-msg-wrapper'>
												<ErrorMessage name='idea_board_name' component={TextError} />
											</div>
										</div>
										<div className='input-group'>
											<label htmlFor='idea_board_description'>
												Description <span className='asterisk'>*</span>
											</label>
											<Field
												as='textarea'
												name='idea_board_description'
												id='idea_board_name'
												autoComplete='off'
											/>
											<div className='error-msg-wrapper'>
												<ErrorMessage name='idea_board_description' component={TextError} />
											</div>
										</div>
										<div className='create-btn'>
											<button type='submit'>Create</button>
										</div>
									</Form>
								)
							}}
						</Formik>
					</div>
				</div>
			</Rodal>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		idea_boards: state.idea_boards
	}
}

export default connect(mapStateToProps, { loadIBS, createIBS })(Dashboard)
