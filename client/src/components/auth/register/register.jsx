import React, { useEffect, useState } from 'react'
import { Redirect, NavLink, Link } from 'react-router-dom'
import validator from 'validator'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { connect } from 'react-redux'

// Components
import BrandLogo from '../../brand-logo/brand-logo'
import { signupAttempt } from '../../../redux/signup/signupActions'
import LoadingPage from '../../loading-page/loading-page'
import LoadingSpinner from '../../loading-spinner/loading-spinner'
import './register.scss'

import Avatars from '../../avatars/avatars-import'

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

function Register({ auth, signup, signupAttempt }) {
	const [avatar_id, setAvatarId] = useState(0)

	const avatars1 = [0, 1, 2, 3, 4, 5]
	const avatars2 = [6, 7, 8, 9, 10, 11]

	const avatarHandler = (id) => {
		console.log(`[avatarHandler] ${id}`)
		setAvatarId(id)
	}

	const onSubmit = (values) => {
		signupAttempt(
			values.first_name + ' ' + values.last_name,
			values.email,
			values.password,
			avatar_id
		)
		console.log(values)
	}

	useEffect(() => {
		document.title = 'Craft Dash | Sign-Up'
	}, [])

	return (
		<div className='register'>
			{!auth.isAuthenticated && auth.loading ? (
				<LoadingPage />
			) : !auth.isAuthenticated ? (
				<React.Fragment>
					<Link to='/landing-page'>
						<BrandLogo custom={{ margin: 'auto', marginTop: '20px' }} />
					</Link>
					<Formik
						initialValues={initialValues}
						validate={validate}
						onSubmit={onSubmit}>
						{(formik) => {
							return (
								<Form>
									<div className='row-1'>
										<div className='field-1'>
											<div className='input-group'>
												<label htmlFor='first_name'>
													First Name <span className='asterisk'>*</span>
												</label>
												<Field
													type='text'
													id='first_name'
													name='first_name'
													autoComplete='off'
													disabled={signup.loading || signup.status}
												/>
												<div className='error-msg-wrapper'>
													<ErrorMessage
														name='first_name'
														component={TextError}
													/>
												</div>
											</div>
										</div>
										<div className='field-2'>
											<div className='input-group'>
												<label htmlFor='last_name'>
													Last Name <span className='asterisk'>*</span>
												</label>
												<Field
													type='text'
													id='last_name'
													name='last_name'
													autoComplete='off'
													disabled={signup.loading || signup.status}
												/>
												<div className='error-msg-wrapper'>
													<ErrorMessage
														name='last_name'
														component={TextError}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className='row-2'>
										<div className='input-group'>
											<label htmlFor='email'>
												Email <span className='asterisk'>*</span>
											</label>
											<Field
												type='text'
												id='email'
												name='email'
												autoComplete='off'
												disabled={signup.loading || signup.status}
											/>
											<div className='error-msg-wrapper'>
												<ErrorMessage name='email' component={TextError} />
											</div>
										</div>
										<div className='input-group'>
											<label htmlFor='password'>
												Password <span className='asterisk'>*</span>
											</label>
											<Field
												type='password'
												id='password'
												name='password'
												autoComplete='current-password'
												disabled={signup.loading || signup.status}
											/>
											<div className='error-msg-wrapper'>
												<ErrorMessage name='password' component={TextError} />
											</div>
										</div>
									</div>
									<div className='row-3'>
										<div className='avatars-wrapper'>
											<div className='avatars-header'>
												<p>
													Select Avatar<span className='asterik'>*</span>
												</p>
											</div>
											<div className='avatars-content'>
												<div className='avatars-row1'>
													{avatars1.map((avatar) => {
														return (
															<Avatars
																index={avatar}
																key={avatar}
																selected={avatar == avatar_id}
																avatarHandler={avatarHandler}
															/>
														)
													})}
													{/* <Avatars index={0} />
													<Avatars index={1} />
													<Avatars index={2} />
													<Avatars index={3} />
													<Avatars index={4} />
													<Avatars index={5} /> */}
												</div>
												<div className='avatars-row2'>
													{avatars2.map((avatar) => {
														return (
															<Avatars
																index={avatar}
																key={avatar}
																selected={avatar == avatar_id}
																avatarHandler={avatarHandler}
															/>
														)
													})}
													{/* <Avatars index={6} />
													<Avatars index={7} />
													<Avatars index={8} />
													<Avatars index={9} />
													<Avatars index={10} />
													<Avatars index={11} /> */}
												</div>
											</div>
										</div>
									</div>
									<div className='row-4'>
										{signup.loading ? (
											<LoadingSpinner color='#ffffff' />
										) : signup.status ? null : (
											<button type='submit' id='submit-btn'>
												Sign - Up
											</button>
										)}
									</div>
									<div className='row-5'>
										<p>
											Already have an account?{' '}
											<NavLink to='/login'>
												<span className='login-link'>Login here</span>
												{/* <img src={'../../../img/Avatar1.png'} alt='Avatar 1'/> */}
											</NavLink>
										</p>
									</div>
								</Form>
							)
						}}
					</Formik>
				</React.Fragment>
			) : (
				<Redirect to='/dashboard' />
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		signup: state.signup
	}
}

export default connect(mapStateToProps, { signupAttempt })(Register)
