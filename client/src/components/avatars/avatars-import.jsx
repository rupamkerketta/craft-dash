import React from 'react'

import Avatar1 from '../../img/Avatar1.png'
import Avatar2 from '../../img/Avatar2.png'
import Avatar3 from '../../img/Avatar3.png'
import Avatar4 from '../../img/Avatar4.png'
import Avatar5 from '../../img/Avatar5.png'
import Avatar6 from '../../img/Avatar6.png'
import Avatar7 from '../../img/Avatar7.png'
import Avatar8 from '../../img/Avatar8.png'
import Avatar9 from '../../img/Avatar9.png'
import Avatar10 from '../../img/Avatar10.png'
import Avatar11 from '../../img/Avatar11.png'
import Avatar12 from '../../img/Avatar12.png'

const avatar_info = [
	{ name: 'Avatar 1', alt: '', src: Avatar1 },
	{ name: 'Avatar 2', alt: '', src: Avatar2 },
	{ name: 'Avatar 3', alt: '', src: Avatar3 },
	{ name: 'Avatar 4', alt: '', src: Avatar4 },
	{ name: 'Avatar 5', alt: '', src: Avatar5 },
	{ name: 'Avatar 6', alt: '', src: Avatar6 },
	{ name: 'Avatar 7', alt: '', src: Avatar7 },
	{ name: 'Avatar 8', alt: '', src: Avatar8 },
	{ name: 'Avatar 9', alt: '', src: Avatar9 },
	{ name: 'Avatar 10', alt: '', src: Avatar10 },
	{ name: 'Avatar 11', alt: '', src: Avatar11 },
	{ name: 'Avatar 12', alt: '', src: Avatar12 }
]

const styles = {
	borderRadius: '50%',
	border: '5px solid white'
}

const Avatars = (props) => {
	return (
		<div
			onClick={() =>
				props.avatarHandler ? props.avatarHandler(props.index) : null
			}
			style={{ cursor: 'pointer' }}>
			<img
				style={props.selected ? { ...styles } : {}}
				src={avatar_info[props.index].src}
				alt={avatar_info[props.index].alt}
			/>
			{/* {processed_avatars[props.index]} */}
		</div>
	)
}

export default Avatars
