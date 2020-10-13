import React from 'react'

import { toast, Slide, Zoom, Flip, Bounce } from 'react-toastify'

import * as TYPE from './notifyTypes'

// ENTER & EXIT
import ENTER from '../../img/enter.svg'
import EXIT from '../../img/leave.svg'

const props = {
	position: 'top-right',
	autoClose: 4000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined
}

const notify = (data, type, transition, customProps) => {
	switch (type) {
		case TYPE.INFO:
			toast.info(data.message, {
				...props,
				...customProps,
				transition: getTransition(transition)
			})
			break

		case TYPE.ERROR:
			toast.error(data.message, {
				...props,
				...customProps,
				transition: getTransition(transition)
			})
			break

		case TYPE.WARNING:
			toast.warning(data.message, {
				...props,
				...customProps,
				transition: getTransition(transition)
			})
			break
		case TYPE.DARK:
			toast.dark(
				({ closeToast }) => (
					<div style={style1.parent}>
						<h3 style={style1.h3}>{`${data.username} ${data.message}`}</h3>
						<img style={{ width: '40px', marginLeft: '30px' }} src={data.enter ? ENTER : EXIT} />
					</div>
				),
				{
					...props,
					...customProps,
					transition: getTransition(transition)
				}
			)
			break
		default:
		// Do nothing
	}
}

const getTransition = (transition) => {
	switch (transition) {
		case 'zoom':
			return Zoom
		case 'flip':
			return Flip
		case 'bounce':
			return Bounce
		case 'slide':
			return Slide
		default:
			return Bounce
	}
}

// Style 1 - ENTER and EXIT
const style1 = {
	parent: { display: 'flex', alignItems: 'center', justifyContent: 'space-around' },
	h3: { fontSize: '1em', marginRight: '10px' }
}

export default notify
