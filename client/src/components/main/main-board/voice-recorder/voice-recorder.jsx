import React from 'react'

// Styles
import 'react-voice-recorder/dist/index.css'
import './voice-recorder.scss'

import { Recorder } from 'react-voice-recorder'

function VoiceRecorder() {
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

	const handleAudioUpload = (file) => {
		console.log(file)
	}
	const handleRest = () => {
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
				handleRest={() => handleRest()}
			/>
		</div>
	)
}

export default VoiceRecorder
