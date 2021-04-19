import React from 'react'

// File Types
import * as FILE_TYPE from './file-types'

// Styles
import './provide-thumbnail.scss'

// Server Address
import { server } from '../../../../utils/api'

// Img Lazy Loading
import ImgLazyLoading from '../../../../img/gif/img-lazy-loading.gif'

// File Icons
import docxIcon from '../../../../img/file-icons/docx-icon.svg'
import xlsIcon from '../../../../img/file-icons/xls-icon.svg'
import htmlIcon from '../../../../img/file-icons/html-icon.svg'
import cssIcon from '../../../../img/file-icons/css-icon.svg'
import scssIcon from '../../../../img/file-icons/scss-icon.svg'
import txtIcon from '../../../../img/file-icons/txt-icon.svg'
import pdfIcon from '../../../../img/file-icons/pdf-icon.svg'
import svgIcon from '../../../../img/file-icons/svg-icon.svg'
import genericIcon from '../../../../img/file-icons/generic-icon.svg'

function ProvideThumbnail(props) {
	const [file_icon, set_file_icon] = React.useState('')
	// const [is_loading, set_is_loading] = React.useState(true)
	// const [timestamp, setTimestamp] = React.useState(Date.now())
	// const [icon, isIcon] = React.useState(true)

	React.useEffect(() => {
		// setTimestamp(Date.now())
		set_file_icon(pickIcon(props.file_thumbnail))
	}, [])

	// const image = React.useRef(null)

	// Determine the icon
	const pickIcon = (tag) => {
		if (!tag.startsWith('#')) {
			// For Svg Files
			if (tag.substr(tag.length - 3) === 'svg') {
				// set_is_loading(false)
				return svgIcon
			}
			// image.current.src = `${server}/api/cloud-storage/get-file/${tag}`
			// image.current.onload = () => {
			// 	console.log('[provide-thumbnail] Image Loaded!!! ', Date.now())
			// 	set_is_loading(false)
			// }
			return `${server}/api/cloud-storage/get-file/${tag}`
		}

		// set_is_loading(false)

		switch (tag) {
			case FILE_TYPE.docx:
				return docxIcon
			case FILE_TYPE.xls:
				return xlsIcon
			case FILE_TYPE.html:
				return htmlIcon
			case FILE_TYPE.css:
				return cssIcon
			case FILE_TYPE.scss:
				return scssIcon
			case FILE_TYPE.txt:
				return txtIcon
			case FILE_TYPE.pdf:
				return pdfIcon
			default:
				return genericIcon
		}
	}

	return (
		<div className='provide-thumbnail'>
			{file_icon !== '' ? (
				<img src={`${file_icon}?${props.myKey}`} alt={file_icon} />
			) : (
				<img src={ImgLazyLoading} alt={props.file_thumbnail} />
			)}
			{/* <img
				key={props.key}
				src={file_icon}
				alt={props.file_thumbnail}
				ref={image}
				style={{
					opacity: is_loading ? 0 : 1
				}}
			/>
			<img
				src={ImgLazyLoading}
				alt={props.file_thumbnail}
				style={{ opacity: is_loading ? 1 : 0 }}
			/> */}
		</div>
	)
}
export default ProvideThumbnail
