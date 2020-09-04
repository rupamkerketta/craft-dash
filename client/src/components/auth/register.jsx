import React, { useEffect } from 'react'
import validator from 'validator'
import { Formik, Form, Field, ErrorMessage } from 'formik'

// Components
import BrandLogo from '../../components/brand-logo/brand-logo'

import '../../sass/register.scss'

const initialValues = {
	first_name: '',
	last_name: '',
	email: '',
	password: ''
}

const validate = (values) => {
	let errors = {}

	if (!values.first_name) {
		errors.first_name = 'Required'
	} else if (!validator.isAlpha(values.first_name)) {
		errors.first_name = 'Invalid first name!!!'
	}

	if (!values.last_name) {
		errors.last_name = 'Required'
	} else if (!validator.isAlpha(values.last_name)) {
		errors.last_name = 'Invalid last name!!!'
	}

	if (!values.email) {
		errors.email = 'Required'
	} else if (!validator.isEmail(values.email)) {
		errors.email = 'Invalid Email'
	}

	if (!values.password) {
		errors.password = 'Required'
	} else if (values.password.length <= 6) {
		errors.password = 'Password length must be <= 7 characters'
	}

	return errors
}

const TextError = (props) => <div className='error-msg'>{props.children}</div>

const onSubmit = (values) => {
	console.log(values)
}

function Register() {
	useEffect(() => {
		document.title = 'Craft Dash | Sign-Up'
	}, [])

	return (
		<div className='register'>
			<BrandLogo custom={{ margin: 'auto', marginTop: '20px' }} />
			<Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
				{(formik) => {
					return (
						<Form>
							<div className='row-1'>
								<div className='field-1'>
									<div className='input-group'>
										<label htmlFor='first_name'>
											First Name <span className='asterisk'>*</span>
										</label>
										<Field type='text' id='first_name' name='first_name' autoComplete='off' />
										<div className='error-msg-wrapper'>
											<ErrorMessage name='first_name' component={TextError} />
										</div>
									</div>
								</div>
								<div className='field-2'>
									<div className='input-group'>
										<label htmlFor='last_name'>
											Last Name <span className='asterisk'>*</span>
										</label>
										<Field type='text' id='last_name' name='last_name' autoComplete='off' />
										<div className='error-msg-wrapper'>
											<ErrorMessage name='last_name' component={TextError} />
										</div>
									</div>
								</div>
							</div>
							<div className='row-2'>
								<div className='input-group'>
									<label htmlFor='email'>
										Email <span className='asterisk'>*</span>
									</label>
									<Field type='text' id='email' name='email' autoComplete='off' />
									<div className='error-msg-wrapper'>
										<ErrorMessage name='email' component={TextError} />
									</div>
								</div>
							</div>
							<div className='row-3'>
								<div className='input-group'>
									<label htmlFor='password'>
										Password <span className='asterisk'>*</span>
									</label>
									<Field
										type='password'
										id='password'
										name='password'
										autoComplete='current-password'
									/>
									<div className='error-msg-wrapper'>
										<ErrorMessage name='password' component={TextError} />
									</div>
								</div>
							</div>
							<div className='row-4'>
								<button type='submit' id='submit-btn'>
									Sign - Up
								</button>
							</div>
							<div className='row-5'>
								<p>
									Already have an account? <span className='login-link'>Login here</span>
								</p>
							</div>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default Register
