import React from 'react'
import '../../../sass/collaborators.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import validator from 'validator'

// Logos
import Idea from '../../../img/idea.svg'

function Collaborators(props) {
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

	const onSubmit = (values) => {
		console.log(values.Collaborator_email)
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
									<button type='submit'>Check & Add</button>
								</div>
							</Form>
						)
					}}
				</Formik>
			</div>
		</div>
	)
}

export default Collaborators
