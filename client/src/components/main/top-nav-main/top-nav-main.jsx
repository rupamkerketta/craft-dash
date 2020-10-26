import React from 'react'
import '../../../sass/top-nav-main.scss'

// Brand Logo
import BrandLogo from '../../brand-logo/brand-logo'


function TopNav() {
	return (
		<div className='top-nav-main'>
			<div className='brand-logo-wrapper'>
				<BrandLogo logoStyles={{ width: '20px' }} fontStyles={{ fontSize: '1.2em', marginLeft: '10px' }} />
			</div>
		</div>
	)
}

export default TopNav
