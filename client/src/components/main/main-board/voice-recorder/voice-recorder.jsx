import React from 'react'

// Styles
import 'react-voice-recorder/dist/index.css'
import './voice-recorder.scss'

import { Recorder } from 'react-voice-recorder'

// API
import api from '../../../../utils/api'

function VoiceRecorder({ idea_board_id }) {
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
			<Recorder
				record={true}
				title={'New recording'}
				audioURL={recorderState.audioDetails.url}
				showUIAudio
				handleAudioStop={(data) => handleAudioStop(data)}
				handleAudioUpload={(data) => handleAudioUpload(data)}
				handleReset={() => handleReset()}
			/>
		</div>
	)
}

export default VoiceRecorder
