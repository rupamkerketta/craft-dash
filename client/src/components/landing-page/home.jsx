import React from 'react'
import './home.scss'

import CDLogo from '../../img/LogoWithLight.svg'
import Illustration1 from '../../img/Guy.svg'
import Globe from '../../img/Globe.svg'
import Illustration2 from '../../img/IdeaBoardIllustration.svg'
import Illustration3 from '../../img/RealTimeInteractionIllustration.svg'
import Illustration4 from '../../img/FileSharingIllustration.svg'
import Illustration5 from '../../img/ThumbsUpGirl.svg'
import Gmail from '../../img//Gmail.svg'
import Twitter from '../../img/Twitter.svg'
import Instagram from '../../img/Instagram.svg'

const Home = () => {
	return (
		<div className='home-page-wrapper'>
			<section className='brand-banner'>
				<div className='about-craft-dash'>
					<p>
						A Real Time Mind Mapping Tool
					</p>
				</div>
				<img src={CDLogo} className='cd-logo' alt='Craft Dash' />
				<img src={Globe} className='globe' alt='Globe' />
				<img
					src={Illustration1}
					className='illustration-1'
					alt='illustration-1'
				/>
			</section>

			<section className='ideaboards-banner'>
				<div className='wrapper'>
					<img src={Illustration2} className='illustration-2' />
					<div className='text-content-wrapper'>
						<div className='text-content'>
							<h1>Idea Boards</h1>
							<p>
								Connect with your team using our Idea Boards for real time
								interaction to collab on another level !!
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className='realtime-interactions-banner'>
				<div className='wrapper'>
					<div className='text-content-wrapper'>
						<div className='text-content'>
							<h1>Real Time Interaction</h1>
							<p>
								Interact with Video and Text messages with zero lag and forget
								the worry of people spying for your data!
							</p>
						</div>
					</div>
					<img src={Illustration3} className='illustration-3' />
				</div>
			</section>

			<section className='file-sharing-banner'>
				<div className='wrapper'>
					<img src={Illustration4} className='illustration-4' />
					<div className='text-content-wrapper'>
						<div className='text-content'>
							<h1>Share and Edit in Real Time</h1>
							<p>
								Share your work files with your fellow team members and keep it
								synchronized to have less pressure on relying to a third party
								service.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className='join-us-banner'>
				<div className='wrapper'>
					<img src={Illustration5} className='illustration-5' />
					<div className='text-content-wrapper'>
						<div className='text-content'>
							<h1>Join Us and Enjoy Much More!</h1>
							<p>So much more we can’t fit it in this page</p>
						</div>
					</div>
				</div>
			</section>

			<section className='contact-info-footer'>
				<div className='wrapper'>
					<div className='contact-logos'>
						<img src={Gmail} alt=''></img>
						<img src={Twitter} alt=''></img>
						<img src={Instagram} alt=''></img>
					</div>
					<div className='contact-info-content'>
						<p>(Work in progress...) by Rupam Kerketta & Vishnu Jayakumar</p>
						{/* <p>© 2021</p> */}
					</div>
				</div>
			</section>
			{/* 
			<div className='row-11'>
				<table>
					<tr>
						<div className='contact-logos'>
							<img src={Gmail} alt=''></img>
							<img src={Twitter} alt=''></img>
							<img src={Instagram} alt=''></img>
						</div>
					</tr>
					<tr>
						<p>Created by Rupam Kerketta & Vishnu Jayakumar</p>
					</tr>
					<tr>
						<p>© 2021</p>
					</tr>
				</table>
			</div> */}
		</div>
	)
}

export default Home
