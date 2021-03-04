import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import BrandLogo from '../../brand-logo/brand-logo'
import User from '../../user/user'
import api from '../../../utils/api'
import { server } from '../../../utils/api'

import notify from '../../../utils/notifications/notify'
import * as NOTIFICATION_TYPE from '../../../utils/notifications/notifyTypes'

import './cloud-storage.scss'

import AddFilesButton from '../../../img/AddFilesButton.png'

import FilesButton from '../../../img/Files.png'
import AudioButton from '../../../img/Audio.png'
import NotesButton from '../../../img/Notes.png'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import CraftDashCloudLogo from '../../../img/CraftDashCloudLogo.png'
import FileAddIcon from '../../../img/folder-add.png'

import ImageIcon from '../../../img/image-icon.svg'
import SvgIcon from '../../../img/svg-icon.svg'
import PdfIcon from '../../../img/pdf-icon.svg'

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	width: 'fit-content',
	margin: 'auto',
	marginTop: 20
}

const thumb = {
	display: 'inline-flex',
	borderRadius: 10,
	//   border: "1px solid #eaeaea",
	width: 'fit-content',
	margin: 'auto',
	marginBottom: 8,
	//   marginRight: 8,
	width: 150,
	height: 150,
	padding: 5,
	boxSizing: 'border-box'
}

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden'
}

const img = {
	display: 'block',
	width: 'auto',
	height: '100%'
}

const style = (url) => {
	return {
		background: `url('${url}') no-repeat center`,
		backgroundSize: 'cover'
	}
}

function CloudStorage({ match, idea_boards }) {
	const [files, setFiles] = useState([])
	// const [remote_files, setRemoteFiles] = useState([])
	const [files_info, setFilesInfo] = useState([])

	// const [isUploading, setIsUploading] = useState(false);

	const [showButtons, setButtonVisibility] = useState(false)
	const [showFilesModal, setFilesModalVisibility] = useState(false)
	const [showAudioModal, setAudioModalVisibility] = useState(false)

	const handleImageModal = () => {
		setFilesModalVisibility(false)
		setFiles([])
	}
	const [ideaBoardId, setIdeaBoardId] = useState('')
	const [ideaBoardName, setIdeaBoardName] = useState('')

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file)
					})
				)
			)
		}
	})

	const thumbs = files.map((file) => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img src={file.preview} style={img} alt='rdz' />
			</div>
		</div>
	))

	useEffect(() => {
		console.log(server)
		setIdeaBoardId(match.params.id)

		const idb = idea_boards.find(
			(idea_board) => idea_board._id == match.params.id
		)

		setIdeaBoardName(idb.idea_board_name)

		async function getFilesInfo(id) {
			try {
				console.log(id)
				const files_info = await api.post('/cloud-storage/get-files-info', {
					idea_board_id: id
				})

				setFilesInfo(files_info.data)
				console.log(files_info.data)
			} catch (err) {
				console.log(err)
			}
		}

		if (idb) {
			getFilesInfo(idb._id)
		}
	}, [])

	const imgSubmit = React.useCallback(async () => {
		try {
			const formData = new FormData()

			files.forEach((file, index) => {
				formData.append(`file${index + 1}`, files[index])
			})

			formData.append('nf', files.length)
			formData.append('idea_board_id', ideaBoardId)

			notify(
				{ message: 'Uploading Files...' },
				NOTIFICATION_TYPE.INFO,
				'zoom',
				{
					autoClose: 3000,
					position: 'bottom-left'
				}
			)

			const res = await api.post('/cloud-storage/uploads', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})

			notify(
				{ username: '', enter: true, message: 'Files Uploaded Successfully' },
				NOTIFICATION_TYPE.DARK,
				'zoom',
				{
					autoClose: 3000,
					position: 'bottom-left'
				}
			)
			console.log(res)
		} catch (err) {}
	}, [files])

	const customStyles = {
		wrapper: {
			backgroundColor: '#1F2023',
			background:
				'linear-gradient(144.37deg, rgba(22, 22, 22, 0.86) 0%, rgba(22, 22, 22, 0.757406) 6.67%, rgba(23, 23, 23, 0.749347) 13.33%, rgba(23, 23, 23, 0.635502) 20%, rgba(24, 24, 24, 0.615777) 26.67%, rgba(24, 25, 25, 0.590468) 33.33%, rgba(25, 26, 27, 0.560435) 40%, rgba(26, 27, 28, 0.527193) 46.67%, rgba(27, 28, 29, 0.492807) 53.33%, rgba(28, 29, 31, 0.459565) 60%, rgba(29, 30, 32, 0.429532) 66.67%, rgba(30, 31, 33, 0.404223) 73.33%, rgba(30, 31, 34, 0.384498) 80%, rgba(31, 32, 35, 0.370653) 86.67%, rgba(31, 32, 35, 0.362594) 93.33%, rgba(31, 32, 35, 0.36) 100%)',
			borderLeft: '1px solid rgba(234,236,239, 0.3)',
			borderTop: '1px solid rgba(234,236,239, 0.3)',
			borderRight: '1px solid rgba(234,236,239, 0.2)',
			borderBottom: '1px solid rgba(234,236,239, 0.2)',
			borderRadius: '5px'
		}
	}
	return (
		<div className='cloud-storage'>
			<div className='top-nav'>
				<div className='brand-logo-wrapper'>
					<NavLink to='/dashboard'>
						<BrandLogo
							fontStyles={{ fontSize: '1.4em', marginLeft: '10px' }}
							logoStyles={{ width: '30px' }}
						/>
					</NavLink>
				</div>
				<div className='user-wrapper'>
					<User />
				</div>
			</div>
			<div className='ideaboard-name'>
				<h1>{ideaBoardName}</h1>
			</div>
			{/* {console.log(files_info.files_info)} */}
			<div className='remote-files-wrapper'>
				{files_info.files_info
					? files_info.files_info.map((file, index) => {
							return (
								<div
									className='remote-file-wrapper'
									key={file.file_name}
									style={{ marginTop: index > 3 ? '90px' : '' }}>
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
			<Rodal
				visible={showFilesModal}
				animation='fade'
				width={1000}
				height={700}
				onClose={() => handleImageModal()}
				className='rodal-cloud-bg'
				customStyles={customStyles.wrapper}>
				<div className='cdc-logo-wrapper'>
					<img
						src={CraftDashCloudLogo}
						alt='Craft Dash Cloud'
						title='Craft Dash Cloud'
					/>
				</div>

				<div className='files-field-wrapper'>
					{/* <div className='label-row-1'>
						<p>Upload Your Files Here</p>
					</div>
					<div className='upload-button'>
          <span>
              <input type="file" id="browse-file" />
              <img src={FileAddIcon} alt="" />
              <label for="browse-file">Browse Files</label>
            </span>
					</div>
					<div className='label-row-2'>
						<p>All documents and images are supported</p>
					</div> */}
					<div {...getRootProps({ className: 'dropzone' })}>
						<input {...getInputProps()} />
						<p className='label-row-1'>
							Drag and Drop Files Here or Click to Browse
						</p>
						<aside style={thumbsContainer}>{thumbs}</aside>
					</div>
					<div className='upload-button-wrapper'>
						<button className='upload-button' onClick={imgSubmit}>
							Upload
						</button>
					</div>
					<div className='label-row-2'>
						<p>All documents and images are supported</p>
					</div>
				</div>
			</Rodal>
			<Rodal
				visible={showAudioModal}
				animation='fade'
				width={1000}
				height={700}
				onClose={() => setAudioModalVisibility(false)}
				className='rodal-cloud-bg'
				customStyles={customStyles.wrapper}>
				<div className='cdc-logo-wrapper'>
					<img
						src={CraftDashCloudLogo}
						alt='Craft Dash Cloud'
						title='Craft Dash Cloud'
					/>
				</div>
				<div className='files-field-wrapper'>
					<div className='label-row-1'>
						<p>Upload Your Audio Files Here</p>
					</div>
					<div className='upload-button'>
						<span>
							<input type='file' id='browse-file' />
							<img src={FileAddIcon} alt='' />
							<label for='browse-file'>Browse Files</label>
						</span>
					</div>
					<div className='label-row-2'>
						<p>Supported Files are mp3, aac, m4a</p>
					</div>
				</div>
			</Rodal>
			<div className='add-button-wrapper'>
				<div className='add-button-base'>
					<div
						className='notes-button'
						style={{ opacity: 0 }}
						// style={{
						//   transform: showButtons
						//     ? "scale(1) rotate(0deg)"
						//     : "scale(0) rotate(-180deg)",
						//   transition: "0.5s ease-in-out",
						// }}
					>
						<img src={NotesButton} alt='Add Notes' title='Add Notes' />
					</div>
					<div
						className='audio-button'
						style={{ opacity: 0 }}
						// style={{
						//   transform: showButtons
						//     ? "scale(1) rotate(0deg)"
						//     : "scale(0) rotate(-180deg)",
						//   transition: "0.5s ease-in-out",
						// }}
					>
						<img
							src={AudioButton}
							alt='Add Audio Files'
							title='Add Audio Files'
							onClick={() => setAudioModalVisibility(true)}
						/>
					</div>
					<div
						className='files-button'
						style={{
							transform: showButtons
								? 'scale(1) rotate(0deg)'
								: 'scale(0) rotate(-180deg)',
							transition: '0.5s ease-in-out'
						}}>
						<img
							src={FilesButton}
							alt='Add New Files'
							title='Add New Files'
							onClick={() => setFilesModalVisibility(true)}
						/>
					</div>
					<div className='add-button'>
						<img
							src={AddFilesButton}
							alt='Add to Cloud'
							title='Add to Cloud'
							style={{
								transform: showButtons ? 'rotate(135deg)' : 'rotate(0deg)',
								transition: '0.5s ease-in-out'
							}}
							onClick={() => setButtonVisibility(!showButtons)}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		idea_boards: state.idea_boards.boards.data
	}
}

export default connect(mapStateToProps, {})(CloudStorage)
