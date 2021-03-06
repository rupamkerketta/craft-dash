import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { v4 as uuid4 } from 'uuid'

// Styles
import './idb-files.scss'

// API
import api from '../../../utils/api'
import { server } from '../../../utils/api'

// Icons
import ImageIcon from '../../../img/image-icon.svg'
import PdfIcon from '../../../img/pdf-icon.svg'
import SvgIcon from '../../../img/svg-icon.svg'

// Redux Dispatches - Elements
import * as ELEMENTS from '../../../redux/elements/elementsActions'

// My-File-Node (Component)
import MyFileNode from './my-file-node/my-file-node'

const style = (url) => {
	return {
		background: `url('${url}') no-repeat center`,
		backgroundSize: 'cover'
	}
}

function IdbFiles({ room, idea_boards, addNode_Main }) {
	const [files_info, setFilesInfo] = useState([])

	const [selectedFile, setSelectedFile] = useState({
		file_name: '',
		file_type: '',
		original_file_name: ''
	})

	const fileSelectHandler = (file) => {
		setSelectedFile({
			file_name: file.file_name,
			file_type: file.file_type,
			original_file_name: file.original_file_name
		})
	}

	const addNode = () => {
		let node = {}
		// setElements((e) => {
		// 	node = {
		// 		id: (e.length + 1).toString(),
		// 		data: { label: `${name}` },
		// 		position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
		// 	}
		// 	return e.concat(node)
		// })
		// FIXME: Fix the random positon of the node, limit its scope around the previous element
		node = {
			id: uuid4(),
			data: {
				label: (
					<>
						<MyFileNode
							file_name={selectedFile.file_name}
							file_type={selectedFile.file_type}
							original_file_name={selectedFile.original_file_name}
						/>
					</>
				)
			},
			type: 'default',
			style: {
				padding: '0',
				boxSizing: 'border-box',
				backgroundColor: '#ffffff',
				width: 'fit-content',
				height: '170px',
				overflow: 'hidden',
				borderRadius: '7px'
			},
			position: {
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight
			}
		}

		addNode_Main(node)
	}

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
			{console.log(selectedFile)}
			<div className='remote-files-wrapper'>
				{files_info.files_info
					? files_info.files_info.map((file, index) => {
							return (
								<div
									className={`remote-file-wrapper ${
										selectedFile.file_name === file.file_name
											? 'file-selected'
											: ''
									}`}
									key={file.file_name}
									style={{ marginTop: index > 1 ? '80px' : '' }}>
									<div
										className='remote-file'
										onClick={() => fileSelectHandler(file)}
										style={
											file.file_type.split('/')[0] === 'image'
												? style(
														`${server}/api/cloud-storage/get-file/${file.file_name}`
												  )
												: {}
										}>
										{/* SVG preview */}
										{file.file_type === 'image/svg+xml' ? (
											<div className='svg-preview'>
												{/* <object
													className='svg-preview'
													type='image/svg+xml'
													data={`${server}/api/cloud-storage/get-file/${file.file_name}`}>
													Svg Preview
												</object> */}
											</div>
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

			<div className='add-files-idb'>
				<button className='add-file-btn' onClick={addNode}>
					Add File
				</button>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		idea_boards: state.idea_boards.boards.data
	}
}

const mapDispatchToProps = {
	addNode_Main: (data) => ELEMENTS.addNode_Main(data)
}

export default connect(mapStateToProps, { ...mapDispatchToProps })(IdbFiles)
