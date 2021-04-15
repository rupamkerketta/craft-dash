import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'

// Brand Logo bor both light and dark theme
import BrandLogo from '../../brand-logo/brand-logo'
import BrandLogoLight from '../../brand-logo-light/brand-logo-light'

// User Component for TopNav
import User from '../../user/user'

// API
import api from '../../../utils/api'

// Notification Utility
import notify from '../../../utils/notifications/notify'
import * as NOTIFICATION_TYPE from '../../../utils/notifications/notifyTypes'

// Styles
import './cloud-storage.scss'
import './cloud-storage-light.scss'

// Redux hook
import { useSelector } from 'react-redux'

// Modal Utility
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'

// Thumbnail Provider Component
import ProvideThumbnail from './provide-thumbnail/provide-thumbnail'

import AddFilesButton from '../../../img/AddFilesButton.png'
import FilesButton from '../../../img/Files.png'
import NotesButton from '../../../img/Notes.png'
import CraftDashCloudLogo from '../../../img/CraftDashCloudLogo.png'
import CraftDashCloudLogoLight from '../../../img/CraftDashCloudLogoLight.png'
import CraftDashNotes from '../../../img/CraftDashNotesLogo.png'

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
	width: 'fit-content',
	margin: 'auto',
	marginBottom: 8,
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

function CloudStorage({ match, idea_boards }) {
	const [files, setFiles] = useState([])
	const [files_info, setFilesInfo] = useState([])

	const [showButtons, setButtonVisibility] = useState(false)
	const [showNotesModal, setNotesModalVisibility] = useState(false)
	const [showFilesModal, setFilesModalVisibility] = useState(false)

	const theme = useSelector((state) => state.theme)
	const dark = theme === 'dark'

	const handleImageModal = () => {
		setFilesModalVisibility(false)
		setFiles([])
	}
	const [ideaBoardId, setIdeaBoardId] = useState('')
	const [ideaBoardName, setIdeaBoardName] = useState('')

	// DropZone
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
		setIdeaBoardId(match.params.id)

		const idb = idea_boards.find(
			(idea_board) => idea_board._id === match.params.id
		)
		setIdeaBoardName(idb.idea_board_name)

		async function getFilesInfo(id) {
			try {
				console.log(id)
				const files_info = await api.post('/cloud-storage/get-files-info', {
					idea_board_id: id
				})

				setFilesInfo(files_info.data)
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
				formData.append('docs', files[index])
			})

			// formData.append('docs', files[0])

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

	const customStylesLight = {
		wrapper: {
			backgroundColor: '#1F2023',
			background:
				'linear-gradient(103.23deg, rgba(164, 238, 254, 0.2) 0%, rgba(165, 238, 254, 0.199654) 6.67%, rgba(166, 238, 254, 0.19858) 13.33%, rgba(169, 239, 254, 0.196734) 20%, rgba(173, 239, 254, 0.194104) 26.67%, rgba(178, 240, 254, 0.190729) 33.33%, rgba(184, 241, 254, 0.186725) 40%, rgba(190, 242, 254, 0.182292) 46.67%, rgba(197, 244, 254, 0.177708) 53.33%, rgba(203, 245, 254, 0.173275) 60%, rgba(209, 246, 254, 0.169271) 66.67%, rgba(214, 247, 254, 0.165896) 73.33%, rgba(218, 247, 254, 0.163266) 80%, rgba(221, 248, 254, 0.16142) 86.67%, rgba(222, 248, 254, 0.160346) 93.33%, rgba(223, 248, 254, 0.16) 100%)',

			borderLeft: '1px solid rgba(234,236,239, 0.3)',
			borderTop: '1px solid rgba(234,236,239, 0.3)',
			borderRight: '1px solid rgba(234,236,239, 0.2)',
			borderBottom: '1px solid rgba(234,236,239, 0.2)',
			borderRadius: '5px'
		}
	}

	return (
		<div className={`cloud-storage ${dark ? '' : 'cloud-storage-light'}`}>
			<div className={`top-nav ${dark ? '' : 'top-nav-light'}`}>
				<div
					className={`brand-logo-wrapper ${
						dark ? '' : 'brand-logo-wrapper-light'
					}`}>
					<NavLink to='/dashboard'>
						{dark ? (
							<BrandLogo
								fontStyles={{ fontSize: '1.4em', marginLeft: '10px' }}
								logoStyles={{ width: '30px' }}
							/>
						) : (
							<BrandLogoLight
								fontStyles={{ fontSize: '1.4em', marginLeft: '10px' }}
								logoStyles={{ width: '30px' }}
							/>
						)}
					</NavLink>
				</div>
				<div className={`user-wrapper ${dark ? '' : 'user-wrapper-light'}`}>
					<User />
				</div>
			</div>
			<div className={`ideaboard-name ${dark ? '' : 'ideaboard-name-light'}`}>
				<h1>{ideaBoardName}</h1>
			</div>
			<div
				className={`remote-files-wrapper ${
					dark ? '' : 'remote-files-wrapper-light'
				}`}>
				{files_info.map((file) => {
					return (
						<div className={`remote-file-wrapper ${dark ? '':'remote-file-wrapper-light'}`} key={file.file_name}>
							<div className={`remote-file ${dark ? '' : 'remote-file-light'}`}>
								<ProvideThumbnail
									file_thumbnail={file.file_thumbnail}
									original_file_name={file.original_file_name}
								/>
							</div>
							<div className={`file-name ${dark ? '' : 'file-name-light'}`}>
								<h3>{file.original_file_name}</h3>
							</div>
							<div
								className={`download-icon-wrapper ${
									dark ? '' : 'download-icon-wrapper-light'
								}`}>
								<img alt='Download File' name='Download File' />
							</div>
						</div>
					)
				})}
			</div>
			<Rodal
				visible={showNotesModal}
				animation='fade'
				width={800}
				height={700}
				onClose={() => setNotesModalVisibility(false)}
				className={`rodal-cloud-bg ${dark ? '' : 'rodal-cloud-bg-light'}`}
				customStyles={dark ? customStyles.wrapper : customStylesLight.wrapper}>
				<div className={`notes-header ${dark ? '' : 'notes-header-light'}`}>
					<img src={CraftDashNotes} alt='Craft Dash Notes' />
				</div>
			</Rodal>
			<Rodal
				visible={showFilesModal}
				animation='fade'
				width={1000}
				height={700}
				onClose={() => handleImageModal()}
				className={`rodal-cloud-bg ${dark ? '' : 'rodal-cloud-bg-light'}`}
				customStyles={dark ? customStyles.wrapper : customStylesLight.wrapper}>
				<div
					className={`cdc-logo-wrapper ${
						dark ? '' : 'cdc-logo-wrapper-light'
					}`}>
					{dark ? (
						<img
							src={CraftDashCloudLogo}
							alt='Craft Dash Cloud'
							title='Craft Dash Cloud'
						/>
					) : (
						<img
							src={CraftDashCloudLogoLight}
							alt='Craft Dash Cloud'
							title='Craft Dash Cloud'
						/>
					)}
				</div>

				<div
					className={`files-field-wrapper ${
						dark ? '' : 'files-field-wrapper-light'
					}`}>
					<div {...getRootProps({ className: 'dropzone' })}>
						<input {...getInputProps()} />
						<p className={`label-row-1 ${dark ? '' : 'label-row-1-light'}`}>
							Drag and Drop Files Here or Click to Browse
						</p>
						<aside style={thumbsContainer}>{thumbs}</aside>
					</div>
					<div
						className={`upload-button-wrapper ${
							dark ? '' : 'upload-button-wrapper-light'
						}`}>
						<button
							className={`upload-button ${dark ? '' : 'upload-button-light'}`}
							onClick={imgSubmit}>
							UPLOAD
						</button>
					</div>
					<div className={`label-row-2 ${dark ? '' : 'label-row-2-light'}`}>
						<p>All documents and images are supported</p>
					</div>
				</div>
			</Rodal>
			<div
				className={`add-button-wrapper ${
					dark ? '' : 'add-button-wrapper-light'
				}`}>
				<div
					className={`add-button-base ${dark ? '' : 'add-button-base-light'}`}>
					<div
						className={`notes-button ${dark ? '' : 'notes-button-light'}`}
						style={{
							transform: showButtons
								? 'scale(1) rotate(0deg)'
								: 'scale(0) rotate(-180deg)',
							transition: '0.5s ease-in-out'
						}}
						onClick={() => setNotesModalVisibility(true)}>
						<img src={NotesButton} alt='Add Notes' title='Add Notes' />
					</div>
					<div
						className={`files-button ${dark ? '' : 'files-button-light'}`}
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
					<div className={`add-button ${dark ? '' : 'add-button-light'}`}>
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
