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

const notify = (message, type) => {
	switch (type) {
		case TYPE.INFO:
			toast.info(message, {
				...props
			})
			break

		case TYPE.ERROR:
			toast.error(message, {
				...props
			})
			break

		case TYPE.WARNING:
			toast.warning(message, {
				...props
			})
			break
		default:
		// Do nothing
	}
}

export default notify
