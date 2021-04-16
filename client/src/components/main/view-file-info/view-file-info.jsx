import React from 'react'

// Styles
import './view-file-info.scss'

// PDF Reader
import { PDFReader } from 'reactjs-pdf-reader'

// Thumbnail Provider
import ProvideThumbnail from '../../dashboard/cloud/provide-thumbnail/provide-thumbnail'

// Redux
import { useSelector } from 'react-redux'

// API
import api from '../../../utils/api'

// Img Lazy Loading
import ImgLazyLoading from '../../../img/gif/img-lazy-loading.gif'

const ViewFileInfoModal = ({ file_info: file }) => {
	const theme = useSelector((state) => state.theme)
	const dark = theme === 'dark'

	const download_el = React.useRef(null)

	const [is_downloading, setIsDownloading] = React.useState(false)
	const [download_status, setDownloadStatus] = React.useState(0)
	const [download_url, setDownloadUrl] = React.useState('')

	const [file_meta, setFileMeta] = React.useState({
		file_size: 0,
		time_created: null
	})

	React.useEffect(() => {
		api.get(`/cloud-storage/file-meta?name=${file.file_name}`).then((res) => {
			console.log(res.data)
			setFileMeta({ ...res.data })
		})
	}, [])

	const downloadFile = async () => {
		if (file_meta.file_size === 0) {
			return
		}
		try {
			setIsDownloading(true)

			const url = `/cloud-storage/get-file/${file.file_name}`
			const response = await api.get(url, {
				responseType: 'blob',
				onDownloadProgress: (progressEvent) => {
					const completed = (progressEvent.loaded / file_meta.file_size) * 100
					setDownloadStatus(completed)
					// console.log('completed: ', completed)
				}
			})
			const downloadUrl = window.URL.createObjectURL(new Blob([response.data]))
			setDownloadUrl(downloadUrl)
			setIsDownloading(false)
			setDownloadStatus(0)

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
				{file.file_type === 'application/pdf' ? (
					<PDFReaderHandler file_name={file.file_name} />
				) : (
					<ProvideThumbnail file_thumbnail={file.file_name} />
				)}
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
						<p>
							Size:{' '}
							{file_meta.file_size !== 0
								? `${(file_meta.file_size / Math.pow(1024, 2)).toPrecision(
										3
								  )} MB`
								: ''}
						</p>
						<p>
							Date Added:{' '}
							{file_meta.time_created !== null ? file_meta.time_created : ''}
						</p>
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
							}`}
							onClick={downloadFile}>
							<div
								className='progress-bar'
								style={{
									display: is_downloading ? 'block' : 'none',
									width: `${download_status}%`
								}}></div>
							<p>
								{is_downloading
									? `DOWNLOADED (${download_status.toPrecision(3)}%)`
									: 'DOWNLOAD'}
							</p>
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

function PDFReaderHandler({ file_name }) {
	const [download_url, setDownloadUrl] = React.useState('')
	const downloadFile = async () => {
		try {
			const url = `/cloud-storage/get-file/${file_name}`
			const response = await api.get(url, {
				responseType: 'blob'
			})
			const downloadUrl = window.URL.createObjectURL(new Blob([response.data]))
			setDownloadUrl(downloadUrl)
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		downloadFile()
	}, [])

	return (
		<div className='pdf-viewer' style={{ overflow: 'auto', height: '100%' }}>
			{console.log(download_url)}
			{download_url !== '' ? (
				<PDFReader url={download_url} scale={1} showAllPage={true} />
			) : (
				<img src={ImgLazyLoading} alt='Loading...' />
			)}
		</div>
	)
}

export default ViewFileInfoModal
