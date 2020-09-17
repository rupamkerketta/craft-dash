import React from 'react'
import '../../sass/loading-page.scss'

// Components
import LoadingSpinner from '../loading-spinner/loading-spinner'
import BrandLogo from '../brand-logo/brand-logo'

function LoadingPage() {
	return (
		<div className='loading-page'>
			<BrandLogo fontStyles={{ display: 'none' }} logoStyles={{ width: '110px' }} />
			<LoadingSpinner color='#ffffff' />
		</div>
	)
}

export default LoadingPage
