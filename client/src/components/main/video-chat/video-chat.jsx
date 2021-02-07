import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'

// Utility Modules
import PropTypes from 'prop-types'

// Main Modules
import Peer from 'simple-peer'

// Sass
import './video-chat.scss'

const VideoChat = ({ socket, roomId, videoFullMode }) => {
	// Slef video
	const myStream = useRef()
	const myVideo = useRef()

	// Peers
	const peersRef = useRef([])
	const [peers, setPeers] = useState([])

	useEffect(() => {
		console.log(videoFullMode)
		navigator.mediaDevices
			.getUserMedia({
				video: true,
				audio: true
			})
			.then((stream) => {
				// My Video Steam
				myStream.current = stream

				// Setting the video stream - my webcam stream
				myVideo.current.srcObject = myStream.current

				socket.emit('join-room', { roomId })
				socket.on('all-users', (data) => {
					// console.log(`[all-users] : data -> ${data.usersInThisRoom}`)
					const peers = []
					data.usersInThisRoom.forEach((userId) => {
						const peer = createPeer(userId, socket.id, myStream.current)
						peersRef.current.push({
							peerId: userId,
							peer
						})
						peers.push({ peer, peerId: userId })
					})
					setPeers(peers)
				})

				socket.on('user-joined', (data) => {
					// console.log('[user-joined]')
					const peer = addPeer(data.signal, data.callerId, myStream.current)

					peersRef.current.push({
						peerId: data.callerId,
						peer
					})

					setPeers((prevPeers) => [
						...prevPeers,
						{ peer, peerId: data.callerId }
					])
				})

				socket.on('user-disconnected-video', (data) => {
					// console.log(`[user-disconnected-video] ${data.userId}`)

					setPeers((prevPeers) =>
						prevPeers.filter((peer) => peer.peerId !== data.userId)
					)

					peersRef.current = peersRef.current.filter(
						(peer) => peer.peerId !== data.userId
					)
				})

				socket.on('receiving-returned-signal', (data) => {
					// console.log('[receiving-returned-signal]')
					const item = peersRef.current.find((peer) => peer.peerId === data.id)
					item.peer.signal(data.signal)
				})
			})
			.catch((e) => {
				console.log(e)
			})
	}, [])

	// Create Peer (function)
	const createPeer = (userToSignal, callerId, stream) => {
		// console.log(`[createPeer] : function called`)
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream
		})

		peer.on('signal', (signal) => {
			// console.log(`[createPeer] : peer.on('signal') called`)
			socket.emit('sending-signal', { userToSignal, callerId, signal })
			// console.log(`[createPeer] : socket.emit('sending-signal')`)
		})

		return peer
	}

	// Add Peer (function)
	const addPeer = (incomingSignal, callerId, stream) => {
		// console.log(`[addPeer] : function called`)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream
		})

		peer.on('signal', (signal) => {
			// console.log(`[addPeer] : peer.on('signal') called`)
			socket.emit('returning-signal', { signal, callerId })
			// console.log(`[addPeer] : socket.emit('returning-signal')`)
		})
		peer.signal(incomingSignal)
		return peer
	}

	return (
		<div className='video-chat'>
			<video
				className='my-video'
				ref={myVideo}
				style={{
					transform: 'rotateY(180deg)',
					width: videoFullMode ? '320px' : '100px',
					height: videoFullMode ? '320px' : '100px',
					marginLeft: videoFullMode ? '320px' : ''
				}}
				autoPlay
				muted
			/>
			<div className='my-peers'>
				{peers.map((peer, index) => (
					<Video
						key={index}
						peer={peer.peer}
						style={{
							transform: 'rotateY(180deg)',
							width: videoFullMode ? '320px' : '100px',
							height: videoFullMode ? '320px' : '100px',
							marginLeft: videoFullMode ? '320px' : ''
						}}
					/>
				))}
			</div>
		</div>
	)
}

// Prop Types
VideoChat.propTypes = {
	socket: PropTypes.object
}

const Video = (props) => {
	const ref = useRef()

	useEffect(() => {
		props.peer.on('stream', (stream) => {
			ref.current.srcObject = stream
		})
	}, [])

	return (
		<div className='video-wrapper'>
			<video ref={ref} style={{ transform: 'rotateY(180deg)' }} autoPlay />
		</div>
	)
}

// const myVideoStyle = {

// }

const mapStateToProps = (state) => {
	return {
		videoFullMode: state.video.videoFullMode
	}
}

export default connect(mapStateToProps, {})(VideoChat)
