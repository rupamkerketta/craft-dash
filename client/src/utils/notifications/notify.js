import { toast } from 'react-toastify'

import * as TYPE from './notifyTypes'

const props = {
	position: 'top-right',
	autoClose: 4000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined
}

const notify = (message, type, autoClose = 4000) => {
	switch (type) {
		case TYPE.INFO:
			toast.info(message, {
				...props,
				autoClose
			})
			break

		case TYPE.ERROR:
			toast.error(message, {
				...props,
				autoClose
			})
			break

		case TYPE.WARNING:
			toast.warning(message, {
				...props,
				autoClose
			})
			break
		default:
		// Do nothing
	}
}

export default notify
