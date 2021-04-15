import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { v4 as uuid4 } from 'uuid'

// Styles
import './idb-files.scss'
import './idb-files-light.scss'

// API
import api from '../../../utils/api'

// Redux Dispatches - Elements
import * as ELEMENTS from '../../../redux/elements/elementsActions'

// My-File-Node (Component)
import MyFileNode from './my-file-node/my-file-node'

import { useSelector } from 'react-redux'

// Thumbnail Provider
import ProvideThumbnail from '../../dashboard/cloud/provide-thumbnail/provide-thumbnail'

function IdbFiles({
	socket,
	selectedFileHandler,
	room,
	idea_boards,
	addNode_Main
}) {
	const [files_info, setFilesInfo] = useState([])

	const [selectedFile, setSelectedFile] = useState({
		file_name: '',
		file_type: '',
		file_thumbnail: '',
		original_file_name: ''
	})

	const fileSelectHandler = (file) => {
		setSelectedFile({
			file_name: file.file_name,
			file_type: file.file_type,
			file_thumbnail: file.file_thumbnail,
			original_file_name: file.original_file_name
		})
	}

	const addNode = () => {
		if (selectedFile.file_name === '') {
			return
		}
		let node = {}
		// FIXME: Fix the random positon of the node, limit its scope around the previous element
		node = {
			id: uuid4(),
			data: {
				label: (
					<>
						<MyFileNode
							file_name={selectedFile.file_name}
							file_type={selectedFile.file_type}
							file_thumbnail={selectedFile.file_thumbnail}
							original_file_name={selectedFile.original_file_name}
							// selectedFileHandler={selectedFileHandler}
						/>
					</>
				)
			},
			type: 'default',
			style: {
				padding: '0',
				boxSizing: 'border-box',
				backgroundColor: '#ffffff',
				width: '300px',
				height: '200px',
				borderRadius: '7px'
			},
			position: {
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight
			}
		}

		addNode_Main(node)

		const modified_node = { ...node, data: { label: '' } }
		const file_info = {
			file_name: selectedFile.file_name,
			file_type: selectedFile.file_type,
			original_file_name: selectedFile.original_file_name
		}

		// Broadcast this to others 🤘
		socket.emit('broadcast-node-file-added', {
			room,
			node: modified_node,
			file_info
		})
	}

	useEffect(() => {
		const idb = idea_boards.find((idea_board) => idea_board._id === room)

		async function getFilesInfo(id) {
			try {
				const files_info = await api.post('/cloud-storage/get-files-info', {
					idea_board_id: id
				})
				console.log(files_info)
				setFilesInfo(files_info.data)
			} catch (err) {
				console.log(err)
			}
		}

		if (idb) {
			getFilesInfo(idb._id)
		}
	}, [])

	const theme = useSelector((state) => state.theme)
	const dark = theme === 'dark'

	return (
		<div className={` idb-files ${dark ? '' : 'idb-files-light'}`}>
			<div
				className={` idb-remote-files-wrapper ${
					dark ? '' : 'idb-remote-files-wrapper-light'
				}`}>
				{files_info
					? files_info.map((file, index) => {
							return (
								<div
									className={`idb-remote-file-wrapper ${
										selectedFile.file_name === file.file_name
											? 'file-selected'
											: ''
									} ${dark ? '' : 'idb-remote-file-wrapper-light'}`}
									onClick={() => fileSelectHandler(file)}
									key={file.file_name}
									style={{ marginTop: index > 1 ? '80px' : '' }}>
									<div className='idb-remote-file'>
										<ProvideThumbnail
											file_thumbnail={file.file_thumbnail}
											original_file_name={file.original_file_name}
										/>
									</div>
									<div
										className={` file-name ${dark ? '' : 'file-name-light'}`}>
										<h3>{file.original_file_name}</h3>
									</div>
								</div>
							)
					  })
					: ''}
			</div>

			<div className={` add-files-idb ${dark ? '' : 'add-files-idb-light'}`}>
				<button
					className={` add-file-btn ${dark ? '' : 'add-file-btn-light'}`}
					onClick={addNode}>
					ADD FILE
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
