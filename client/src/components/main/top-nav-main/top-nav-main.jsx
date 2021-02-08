import React from 'react'
import { connect } from 'react-redux'
import './top-nav-main.scss'

// Brand Logo
import BrandLogo from '../../brand-logo/brand-logo'

// Video Actions
import {
	enableFullMode,
	disableFullMode
} from '../../../redux/video/videoActions'

// Expand Button
import ExpandButtonInactive from '../../../img/expand-btn-active-min.png'
// import ExpandButtonInactive from '../../../img/expand-btn-inactive.png'
import ExpandButtonActive from '../../../img/expand-btn-inactive.png'

function TopNav({ videoFullMode, enableFullMode, disableFullMode }) {
	const videoToggleHandler = () => {
		if (videoFullMode) {
			disableFullMode()
		} else {
			enableFullMode()
		}
	}

	return (
		<div className='top-nav-main'>
			<div className='expand-btn-wrapper'>
				<img
					className='expand-btn'
					src={videoFullMode ? ExpandButtonActive : ExpandButtonInactive}
					alt='Expand Video'
					onClick={videoToggleHandler}
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

const mapStateToProps = (state) => {
	return {
		videoFullMode: state.video.videoFullMode
	}
}

const mapDispatchToProps = {
	enableFullMode,
	disableFullMode
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNav)
