import React from 'react'
import './loading-spinner.css'

function LoadingSpinner(props) {
	return (
		<div className='loading-spinner-wrapper'>
			<div className='lds-ellipsis'>
				<div style={{ backgroundColor: props.color ? props.color : '#FF2D92' }} />
				<div style={{ backgroundColor: props.color ? props.color : '#08E789' }} />
				<div style={{ backgroundColor: props.color ? props.color : '#C521FF' }} />
				<div style={{ backgroundColor: props.color ? props.color : '#2FDAE4' }} />
			</div>
		</div>
	)
}

export default LoadingSpinner
