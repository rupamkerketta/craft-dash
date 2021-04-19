import React from 'react'
import { connect } from 'react-redux'

// Styles
import 'react-voice-recorder/dist/index.css'
import './voice-recorder.scss'

import { Recorder } from 'react-voice-recorder'

// Update List - Action
import { updateList } from '../../../../redux/update-list/updateListActions'

// API
import api from '../../../../utils/api'

function VoiceRecorder({ idea_board_id, updateList }) {
	const [is_uploading, setIsUploading] = React.useState(false)
	const [upload_progress, setUploadProgress] = React.useState(0)

	const [recorderState, setRecorderState] = React.useState({
		audioDetails: {
			url: null,
			blob: null,
			chunks: null,
			duration: {
				h: 0,
				m: 0,
				s: 0
			}
		}
	})

	const handleAudioStop = (data) => {
		console.log(data)
		setRecorderState({ audioDetails: data })
	}

	const handleAudioUpload = async (file) => {
		try {
			if (upload_progress === 0 && is_uploading === false) {
				console.log(upload_progress + ' ' + is_uploading)
				const formData = new FormData()

				formData.append('docs', file)
				formData.append('idea_board_id', idea_board_id)

				setIsUploading(true)
				const res = await api.post('/cloud-storage/uploads', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					onUploadProgress: (progressEvent) => {
						let uploaded = progressEvent.loaded / progressEvent.total
						console.log(uploaded * 100)
						setUploadProgress(uploaded * 100)
					}
				})

				setUploadProgress(0)
				setIsUploading(false)
				console.log(res)
				updateList(idea_board_id)
			}
		} catch (err) {}
	}
	const handleReset = () => {
		const reset = {
			url: null,
			blob: null,
			chunks: null,
			duration: {
				h: 0,
				m: 0,
				s: 0
			}
		}
		setRecorderState({ audioDetails: reset })
	}

	return (
		<div className='voice-recorder'>
			{is_uploading ? (
				<div className='upload-progress-wrapper'>
					<div
						className='upload-progress-bar'
						style={{ width: `${upload_progress}%` }}></div>
					<h3 className='upload-label'>
						{upload_progress === 100
							? 'PROCESSING FILE(S)...'
							: `UPLOADING (${upload_progress}%)`}
					</h3>
				</div>
			) : (
				<Recorder
					record={true}
					title={'New recording'}
					audioURL={recorderState.audioDetails.url}
					showUIAudio
					handleAudioStop={(data) => handleAudioStop(data)}
					handleAudioUpload={(data) => handleAudioUpload(data)}
					handleReset={() => handleReset()}
				/>
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = {
	updateList
}

export default connect(mapStateToProps, mapDispatchToProps)(VoiceRecorder)
