import React from 'react'

import CDLogo from '../../img/LogoWithLight.svg'
import ToolsIcons from '../../img/toolsIcons.svg'

const About = () => {
	return (
		<div>
			<div className='logo'>
				<img src={CDLogo} alt='LogoWithLight' />
				<p>
					A web application which allows you to Create IdeaBoard Host Meetings
					Note Creation, Mind-mapping Real-time group chats (Video and Text)
					Polling on Ideas Task Planning or Roadmap for a particular topic for
					any subject Role-Based Activities and Privileges Voice Notes File
					Sharing (Images, Videos, Text Files, etc.)
				</p>
			</div>
			<div className='row-12'>
				<table>
					<tr>
						<div className='tech-logos'>
							<img src={ToolsIcons}></img>
						</div>
					</tr>
					<tr>
						<p>Created by Rupam Kerketta & Vishnu Jayakumar</p>
					</tr>
					<tr>
						<p>© 2021</p>
					</tr>
				</table>
			</div>
		</div>
	)
}

export default About