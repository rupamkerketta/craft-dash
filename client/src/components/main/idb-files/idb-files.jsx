import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

// Styles
import './idb-files.scss'

// API
import api from '../../../utils/api'
import { server } from '../../../utils/api'

// Icons
import ImageIcon from '../../../img/image-icon.svg'
import PdfIcon from '../../../img/pdf-icon.svg'
import SvgIcon from '../../../img/svg-icon.svg'

const style = (url) => {
	return {
		background: `url('${url}') no-repeat center`,
		backgroundSize: 'cover'
	}
}

function IdbFiles({ room, idea_boards }) {
	const [files_info, setFilesInfo] = useState([])

	useEffect(() => {
		console.log('[IDB Files]')
		console.log(room)

		const idb = idea_boards.find((idea_board) => idea_board._id === room)

		async function getFilesInfo(id) {
			try {
				console.log(id)
				const files_info = await api.post('/cloud-storage/get-files-info', {
					idea_board_id: id
				})

				setFilesInfo(files_info.data)
				// console.log(files_info.data)
			} catch (err) {
				console.log(err)
			}
		}

		if (idb) {
			getFilesInfo(idb._id)
		}
	}, [])

	return (
		<div className='idb-files'>
			<div className='remote-files-wrapper'>
				{files_info.files_info
					? files_info.files_info.map((file, index) => {
							return (
								<div
									className='remote-file-wrapper'
									key={file.file_name}
									style={{ marginTop: index > 1 ? '80px' : '' }}>
									<div
										className='remote-file'
										style={
											file.file_type.split('/')[0] === 'image'
												? style(
														`${server}/api/cloud-storage/get-file/${file.file_name}`
												  )
												: {}
										}>
										{/* SVG preview */}
										{file.file_type === 'image/svg+xml' ? (
											<object
												className='svg-preview'
												type='image/svg+xml'
												data={`${server}/api/cloud-storage/get-file/${file.file_name}`}>
												Svg Preview
											</object>
										) : (
											''
										)}

										{/* PDF */}
										{file.file_type === 'application/pdf' ? (
											<img className='pdf-bg' src={PdfIcon} alt='i' />
										) : (
											''
										)}
									</div>
									<div className='file-icon'>
										{file.file_type.split('/')[0] === 'image' ? (
											file.file_type.split('/')[1] === 'svg+xml' ? (
												<img className='image-icon' src={SvgIcon} alt='i' />
											) : (
												<img className='image-icon' src={ImageIcon} alt='i' />
											)
										) : (
											''
										)}
										{file.file_type.split('/')[1] === 'pdf' ? (
											<img className='image-icon' src={PdfIcon} alt='i' />
										) : (
											''
										)}
									</div>
									<div className='file-name'>
										<h3>{file.original_file_name}</h3>
									</div>
								</div>
							)
					  })
					: ''}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		idea_boards: state.idea_boards.boards.data
	}
}

export default connect(mapStateToProps, {})(IdbFiles)
