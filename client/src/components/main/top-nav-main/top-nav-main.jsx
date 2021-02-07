import React from 'react'
import './top-nav-main.scss'

// Brand Logo
import BrandLogo from '../../brand-logo/brand-logo'

// Expand Button
import ExpandButtonActive from '../../../img/expand-btn-active-min.png'
import ExpandButtonInactive from '../../../img/expand-btn-inactive-min.png'

function TopNav() {
	return (
		<div className='top-nav-main'>
			<div className='expand-btn-wrapper'>
				<img
					className='expand-btn'
					src={ExpandButtonInactive}
					alt='Expand Video'
				/>
			</div>
			<div className='brand-logo-wrapper'>
				<BrandLogo
					logoStyles={{ width: '20px' }}
					fontStyles={{ fontSize: '1.2em', marginLeft: '10px' }}
				/>
			</div>
		</div>
	)
}

export default TopNav
