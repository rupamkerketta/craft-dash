import React from 'react'
import '../../../sass/messaging.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'

// Logos
import MessagingIcon from '../../../img/messaging-icon.svg'

function Messaging(props) {
	const initialValues = {
		message: '',
		owner: '',
		idea_board_id: ''
	}

	const validate = (values) => {}

	const onSubmit = (values, { resetForm }) => {
		resetForm()
	}

	return (
		<div className='messaging'>
			<div className='messaging-icon-wrapper'>
				<img src={MessagingIcon} alt='Chat Box' title='Chat Box' />
			</div>
			<div className='chat-messages'>
				<h4>Messaging - Chat Messages</h4>
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
}

export default Messaging
