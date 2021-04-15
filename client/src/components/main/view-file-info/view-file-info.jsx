import React from 'react'

// Styles
import './view-file-info.scss'

// Thumbnail Provider
import ProvideThumbnail from '../../dashboard/cloud/provide-thumbnail/provide-thumbnail'

// Redux
import { useSelector } from 'react-redux'

// API
import api from '../../../utils/api'

const ViewFileInfoModal = ({ file_info: file }) => {
	const theme = useSelector((state) => state.theme)
	const dark = theme === 'dark'

	const download_el = React.useRef(null)

	const [is_downloading, setIsDownloading] = React.useState(false)
	const [download_status, setDownloadStatus] = React.useState(0)
	const [download_url, setDownloadUrl] = React.useState('')

	const downloadFile = async () => {
		try {
			setIsDownloading(true)

			const url = `/cloud-storage/file?name=${file.file_name}`

			const file_meta = await api.get(
				`/cloud-storage/file-meta?name=${file.file_name}`
			)

			const response = await api.get(url, {
				responseType: 'blob',
				onDownloadProgress: (progressEvent) => {
					const completed =
						(progressEvent.loaded / file_meta.data.file_size) * 100
					setDownloadStatus(completed)
					console.log('completed: ', completed)
				}
			})
			const downloadUrl = window.URL.createObjectURL(new Blob([response.data]))
			setDownloadUrl(downloadUrl)

			download_el.current.click()
		} catch (error) {
			console.log(error)
			setIsDownloading(false)
		}
	}

	return (
		<div
			className={`view-file-info-modal ${
				dark ? '' : 'view-file-info-modal-light'
			}`}>
			<div className={`file-preview ${dark ? '' : 'file-preview-light'}`}>
				<ProvideThumbnail file_thumbnail={file.file_name} />
			</div>
			<a
				href={download_url}
				download={file.original_file_name}
				ref={download_el}
				style={{
					opacity: 0,
					pointerEvents: 'none',
					width: '1px',
					height: '1px'
				}}>
				.
			</a>
			<div
				className={`file-modal-details-wrapper ${
					dark ? '' : 'file-modal-details-wrapper-light'
				}`}>
				<div
					className={`file-name-modal ${dark ? '' : 'file-name-modal-light'}`}>
					<p>{file.original_file_name}</p>
				</div>
				<div
					className={`file-info-details ${
						dark ? '' : 'file-info-details-light'
					}`}>
					<div
						className={`details-wrapper ${
							dark ? '' : 'details-wrapper-light'
						}`}>
						<p>Type: {file.file_type}</p>
						<p>Size: size here</p>
						<p>Date Added: Abc 00 0000, 00:00:00</p>
					</div>
				</div>
				<div
					className={`file-info-modal-buttons ${
						dark ? '' : 'file-info-modal-buttons-light'
					}`}>
					<div
						className={`download-button ${
							dark ? '' : 'download-button-light'
						}`}>
						<div
							className={`download-button-content ${
								dark ? '' : 'download-button-content-light'
							}`}>
							<p>DOWNLOAD</p>
						</div>
					</div>
					<div
						className={`remove-node-button ${
							dark ? '' : 'remove-node-button-light'
						}`}>
						<div
							className={`remove-node-button-content ${
								dark ? '' : 'remove-node-button-content-light'
							}`}>
							<p>REMOVE FROM NODE</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ViewFileInfoModal
