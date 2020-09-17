import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import '../../sass/dashboard.scss'

import Rodal from 'rodal'
import 'rodal/lib/rodal.css'

// Components
import BrandLogo from '../brand-logo/brand-logo'
import DashboardCards from './dashboard-cards/dashboard-cards'
import User from '../user/user'

// Logos
import AddBtn from '../../img/add-button.svg'
import Idea from '../../img/idea.svg'

const initialValues = {
	ideaboard_name: '',
	ideboard_description: ''
}

const validate = (values) => {
	let errors = {}

	if (!values.ideaboard_name) {
		errors.ideaboard_name = 'Required'
	} else if (values.ideaboard_name.length > 20) {
		errors.ideaboard_name = 'Name too long'
	}

	if (!values.ideaboard_description) {
		errors.ideaboard_description = 'Required'
	} else if (values.ideaboard_description.length > 30) {
		errors.ideboard_description = 'Description too long'
	}

	return errors
}

const TextError = (props) => <div className='error-msg'>{props.children}</div>

function Dashboard() {
	const [ visible, setVisible ] = useState(false)

	useState(() => {
		document.title = 'Craft Dash | Main'
	}, [])

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
				<DashboardCards title='My App' />
				<DashboardCards />
				<DashboardCards />
				<DashboardCards />
				<DashboardCards />
				<DashboardCards />
				<DashboardCards />
				<DashboardCards />
				<DashboardCards />
				<DashboardCards />
				<DashboardCards />
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
						<Formik initialValues={initialValues} validate={validate}>
							{(formik) => {
								return (
									<Form>
										<div className='input-group'>
											<label htmlFor='ideaboard_name'>
												IdeaBoard name <span className='asterisk'>*</span>
											</label>
											<Field
												type='text'
												name='ideaboard_name'
												id='ideaboard_name'
												autoComplete='off'
											/>
											<div className='error-msg-wrapper'>
												<ErrorMessage name='ideaboard_name' component={TextError} />
											</div>
										</div>
										<div className='input-group'>
											<label htmlFor='ideaboard_description'>
												Description <span className='asterisk'>*</span>
											</label>
											<Field
												as='textarea'
												name='ideaboard_description'
												id='ideaboard_name'
												autoComplete='off'
											/>
											<div className='error-msg-wrapper'>
												<ErrorMessage name='ideaboard_description' component={TextError} />
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

export default Dashboard
