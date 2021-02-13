import React from 'react'
import craft_dash_logo from '../../img/craft-dash-logo.svg'
import './brand-logo.scss'

function BrandLogo(props) {
	return (
		<div className='brand-logo-wrapper'>
			<div className='brand-logo-light' style={props.custom}>
				{props.logoStyles ? (
					<img
						src={craft_dash_logo}
						alt='Craft Dash'
						style={{ ...props.logoStyles }}
					/>
				) : (
					<img src={craft_dash_logo} alt='Craft Dash' />
				)}
				{props.fontStyles ? (
					<h1 style={{ ...props.fontStyles }}>Craft Dash</h1>
				) : (
					<h1>Craft Dash</h1>
				)}
			</div>
		</div>
	)
}

export default BrandLogo
