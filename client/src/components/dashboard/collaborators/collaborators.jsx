import React from 'react'
import { connect } from 'react-redux'
import '../../../sass/collaborators.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import validator from 'validator'

// Logos
import Idea from '../../../img/idea.svg'
import LoadingSpinner from '../../loading-spinner/loading-spinner'

// Components
import Collaborator from './collaborator/collaborator'

import { actionCollaborator } from '../../../redux/collaborator/collaboratorActions'

function Collaborators({ idea_board_id, boards, actionCollaborator, collaborator }) {
	const initialValues = {
		collaborator_email: ''
	}

	const validate = (values) => {
		let errors = {}

		if (!values.collaborator_email) {
			errors.collaborator_email = 'Required'
		} else if (!validator.isEmail(values.collaborator_email)) {
			errors.collaborator_email = 'Invalid collaborator email'
		}

		return errors
	}

	const onSubmit = (values, { resetForm }) => {
		resetForm()
		actionCollaborator({
			...values,
			action: 'add-collaborator',
			idea_board_id
		})
	}

	const TextError = (props) => <div className='error-msg'>{props.children}</div>

	return (
		<div className='collaborators'>
			<div className='collaborators-header'>
				<img src={Idea} alt='Idea' />
				<h1 className='collaborators-title'>Edit IdeaBoard - Collaborators</h1>
			</div>

			<div className='collaborators-form'>
				<Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
					{(formik) => {
						return (
							<Form>
								<div className='input-group'>
									<label htmlFor='collaborator_emali'>Add Collaborators</label>
									<Field
										type='text'
										name='collaborator_email'
										id='collaborator_email'
										autoComplete='off'
									/>
									<div className='error-msg-wrapper'>
										<ErrorMessage name='collaborator_email' component={TextError} />
									</div>
								</div>
								<div className='check-and-add'>
									{collaborator.addIsLoading ? (
										<LoadingSpinner color='#0087cc' />
									) : (
										<button type='submit'>
											<span>Check & Add</span>
										</button>
									)}
								</div>
							</Form>
						)
					}}
				</Formik>
			</div>
			<div className='collaborators-list-wrapper'>
				<div className='collaborators-list-header'>
					<h2>Collaborators</h2>
				</div>
				<div className='collaborators-list-content'>
					{boards.map((board) => {
						if (board._id.toString() === idea_board_id.toString() && board.collaborators.length !== 0) {
							const res = board.collaborators.map((collaborator) => (
								<Collaborator
									key={collaborator}
									collaborator_email={collaborator}
									idea_board_id={idea_board_id}
								/>
							))
							return res
						}
					})}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		collaborator: state.collaborator,
		boards: state.idea_boards.boards.data
	}
}

export default connect(mapStateToProps, { actionCollaborator })(Collaborators)
