import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'

// Utility Modules
import PropTypes from 'prop-types'

// Main Modules
import Peer from 'simple-peer'

// Sass
import './video-chat.scss'

const VideoChat = ({ socket, roomId, videoFullMode, room, user }) => {
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

				socket.emit('join-room', { roomId, username: user.username })
				socket.on('all-users', (data) => {
					console.log(`[all-users] : data -> ${data.usersInThisRoom}`)
					let peers = []
					data.usersInThisRoom.forEach((user) => {
						const peer = createPeer(user.socketId, socket.id, myStream.current)
						peersRef.current.push({
							peerId: user.socketId,
							peer,
							username: user.username
						})
						peers.push({ peer, peerId: user.socketId, username: user.username })
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
						{ peer, peerId: data.callerId, username: data.username }
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
			socket.emit('sending-signal', {
				userToSignal,
				callerId,
				signal,
				username: user.username
			})
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
			socket.emit('returning-signal', {
				signal,
				callerId,
				username: user.username
			})
			// console.log(`[addPeer] : socket.emit('returning-signal')`)
		})
		peer.signal(incomingSignal)
		return peer
	}

	const videoChatFullOff = {
		width: '150px',
		minHeight: '150px',
		marginTop: '3px',
		flexDirection: 'column'
	}

	const videoChatFullOn = {
		width: '77vw',
		height: '290px',
		flexDirection: 'row'
	}

	const videoChatOn = {
		width: '230px',
		height: '230px',
		marginTop: ''
	}

	const videoChatOff = {
		width: '120px',
		height: '120px',
		marginTop: '10px'
	}

	const peerNameFullOff = {
		fontSize: '0.6em',
	}

	const peerNameFullOn = {
		fontSize: '0.8em',
	}

	return (
		<div
			className={`video-chat`}
			style={videoFullMode ? { ...videoChatFullOn } : { ...videoChatFullOff }}>
			<div
				className='my-peers'
				style={{
					paddingBottom: videoFullMode ? '20px' : '5px',
					paddingTop: videoFullMode ? '20px' : ''
				}}>
				<div className='my-video-wrapper'>
					<video
						className='my-video'
						ref={myVideo}
						style={videoFullMode ? { ...videoChatOn } : { ...videoChatOff }}
						autoPlay
						muted
					/>
					<div className='my-name'>
						<p>You</p>
					</div>
				</div>

				{peers.map((peer, index) => (
					<Video
						key={index}
						username={peer.username}
						peer={peer.peer}
						peerId={peer.peerId}
						videoFullMode={videoFullMode}
						videoChatOff={videoChatOff}
						videoChatOn={videoChatOn}
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
			<video
				ref={ref}
				style={
					props.videoFullMode
						? { ...props.videoChatOn }
						: { ...props.videoChatOff }
				}
				autoPlay
			/>
			<div className='peer-name'>
				<p style={props.videoFullMode ? {fontSize: '0.9em'}:{fontSize: '0.7em'}}>{props.username}</p>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		videoFullMode: state.video.videoFullMode,
		room: state.room,
		user: state.user
	}
}

export default connect(mapStateToProps, {})(VideoChat)
