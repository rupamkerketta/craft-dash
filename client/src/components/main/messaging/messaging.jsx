import React, { useEffect } from 'react'
import '../../../sass/messaging.scss'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'

import { addMessage, resetMessages } from '../../../redux/chat/chatActions'

// Chat Emojis
import ReactEmoji from 'react-emoji'

const Messaging = ({ room, username, email, messages, socket, addMessage }) => {
	useEffect(() => {
		socket.on('chat-message', (data) => {
			const message = data.message.message
			const time = data.time
			const username = data.username
			addMessage({ username, message, time, room })
		})

		return () => {
			console.log('[messaging] un-mounted')
			window.location.reload()
		}
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
			{/* <div className='messaging-icon-wrapper'>
				<img src={MessagingIcon} alt='Chat Box' title='Chat Box' />
			</div> */}

			<Chats messages={messages} />

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
}

const Chats = (props) => {
	return (
		<div className='chat-messages'>
			{props.messages.map((obj, index) => {
				return <Message key={index} data={obj} />
			})}
		</div>
	)
}

const Message = (props) => {
	return (
		<div className='message'>
			<p className='chat-meta'>
				{props.data.username} <span className='time'>{props.data.time}</span>
			</p>
			<div className='chat-content-wrapper'>
				<p className='chat-content'>{ReactEmoji.emojify(props.data.message)}</p>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		username: state.user.username,
		email: state.user.email,
		messages: state.chat.messages
	}
}

export default connect(mapStateToProps, { addMessage, resetMessages })(Messaging)
