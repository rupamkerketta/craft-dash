import React, { useEffect, useState } from 'react'
import '../../../sass/messaging.scss'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'

// Logos
import MessagingIcon from '../../../img/messaging-icon.svg'

const Messaging = React.memo(({ room, username, socket }) => {
	const [ messages, setMessages ] = useState([])

	socket.on('chat-message', (data) => {
		const obj = { message: data.message }
		setMessages([ ...messages, obj ])
	})

	useEffect(() => {
		socket.emit('joinRoom', { username, room })
	}, [])

	const initialValues = {
		message: ''
	}

	const validate = (values) => {
		let errors = {}

		if (!values.message) {
			errors.message = 'required'
		}

		return errors
	}

	const onSubmit = (values, { resetForm }) => {
		resetForm()
		console.log(values, room, username)
		socket.emit('chat-message', { username, room, message: values.message })
	}

	return (
		<div className='messaging'>
			<div className='messaging-icon-wrapper'>
				<img src={MessagingIcon} alt='Chat Box' title='Chat Box' />
			</div>
			<div className='chat-messages'>
				{messages.map((obj, index) => {
					return <Message key={index} data={obj.message} />
				})}
			</div>
			<div className='chat-input'>
				<Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
					{(formik) => {
						return (
							<Form>
								<div className='input-group'>
									<Field type='text' name='message' id='message' autoComplete='off' />
								</div>
							</Form>
						)
					}}
				</Formik>
			</div>
		</div>
	)
})

const Message = (props) => {
	return (
		<div className='message'>
			<p className='chat-meta'>
				{props.data.username} <span className='time'>10:30</span>
			</p>
			<div className='chat-content-wrapper'>
				<p className='chat-content'>{props.data.message}</p>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		username: state.user.username
	}
}

export default connect(mapStateToProps)(Messaging)
