import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { attemptLogin } from '../../../redux/login/loginActions'
import validator from 'validator'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import './login.scss'

// Components
import BrandLogo from '../../brand-logo/brand-logo'
import LoadingPage from '../../loading-page/loading-page'
import { Link, Redirect } from 'react-router-dom'

// Social Login Icons
import GoogleIcon from '../../../img/GoogleSocialIcon.png'
import FacebookIcon from '../../../img/FacebookIcon.svg'

const initialValues = {
	email: '',
	password: ''
}

const validate = (values) => {
	let errors = {}

	if (!values.email) {
		errors.email = 'Required'
	} else if (!validator.isEmail(values.email)) {
		errors.email = 'Invalid Email'
	}

	if (!values.password) {
		errors.password = 'Required'
	} else if (values.password.length <= 7) {
		errors.password = 'Enter a valid password'
	}

	return errors
}

const TextError = (props) => <div className='error-msg'>{props.children}</div>

function Login({ auth, attemptLogin }) {
	const onSubmit = (values) => {
		attemptLogin(values.email, values.password)
	}

	const [displayError, setDisplayError] = React.useState(true)

	useEffect(() => {
		document.title = 'Craft Dash | Login'
	}, [])

	return (
		<div className='login'>
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
										<div className='input-group'>
											<label htmlFor='email'>Email</label>
											<Field
												type='text'
												name='email'
												id='email'
												autoComplete='off'
												placeholder='e.g john@mail.com'
											/>
											<div
												className='error-msg-wrapper'
												style={{ display: displayError ? 'block' : 'none' }}>
												<ErrorMessage name='email' component={TextError} />
											</div>
										</div>
									</div>
									<div className='row-2'>
										<div className='input-group'>
											<label htmlFor='password'>Password</label>
											<Field
												type='password'
												name='password'
												id='password'
												placeholder='*****************'
												autoComplete='current-password'
											/>
											<div
												className='error-msg-wrapper'
												style={{ display: displayError ? 'block' : 'none' }}>
												<ErrorMessage name='password' component={TextError} />
											</div>
										</div>
									</div>
									<div className='row-3'>
										<button type='submit' id='submit-btn'>
											Login
										</button>
									</div>
									<div className='row-4'>
										<p>
											Don't have an account?{' '}
											<NavLink to='/signup'>
												<span className='register-link'>Register here</span>
											</NavLink>
										</p>
									</div>
									<div className='row-5'>
										<p>OR</p>
									</div>
									<div className='row-6'>
										<div className='social-login'>
											<button
												onClick={() => {
													setDisplayError(false)
													window.location =
														window.location.hostname === 'localhost'
															? 'http://localhost:5000/auth/google'
															: 'http://craftdash.xyz/auth/google'
												}}
												alt='Login with Google'
												title='Login with Google'
												className='google-button'>
												<img />
												<img
													src={GoogleIcon}
													alt='Login with Google'
													title='Login with Google'
												/>
												<p>Sign in with Google</p>
											</button>
											<button
												alt='Login with Facebook'
												title='Login with Facebook'
												className='facebook-button'>
												<img />
												<img
													src={FacebookIcon}
													alt='Login with Facebook'
													title='Login with Facebook'
												/>
												<p>Continue with Facebook</p>
											</button>
										</div>
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
		auth: state.auth
	}
}

export default connect(mapStateToProps, { attemptLogin })(Login)
