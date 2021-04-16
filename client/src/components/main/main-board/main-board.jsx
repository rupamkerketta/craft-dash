import React, { useState, useEffect, useRef } from 'react'
import { useSelector, connect } from 'react-redux'

// Styles
import './main-board.scss'
import './main-board-light.scss'

// Server Address
import { server } from '../../../utils/api'

// UUID
import { v4 as uuid4 } from 'uuid'

// Rodal
import Rodal from 'rodal'

// Redux Dispatches
import { hideFileInfo } from '../../../redux/view-file/viewFilesActions'

// My-File-Node
import MyFileNode from '../idb-files/my-file-node/my-file-node'

// Voice Recorder
import VoiceRecorder from './voice-recorder/voice-recorder'

// Recording Icon
import Recording from '../../../img/recording.svg'

// Pointer - 1
import Pointer1 from '../../../img/pointer-1.png'
import Pointer2 from '../../../img/pointer-2.png'
import Pointer3 from '../../../img/pointer-3.png'
import Pointer4 from '../../../img/pointer-4.png'

// React Flow Renderer
import ReactFlow, {
	addEdge,
	Background,
	Controls,
	MiniMap
} from 'react-flow-renderer'

import { addNewUserRoom, removeUserRoom } from '../../../redux/room/roomActions'
import { addUsersRoom, setIdRoom } from '../../../redux/room/roomActions'
import {
	viewVNModal,
	hideVNModal
} from '../../../redux/voice-note/voiceNoteActions'

// Elements
import * as ELEMENTS from '../../../redux/elements/elementsActions'

// Focus - Elements
import * as FOCUS from '../../../redux/elements/focus-elements/focusElementsActions'
import * as FOCUS_TEXT from '../../../redux/elements/focus-text/focusTextActions'

// File Info Modal
import ViewFileInfoModal from '../view-file-info/view-file-info'

const MainBoard = ({
	room,
	socket,
	user,
	viewFile,
	show_vn_modal,
	viewVNModal,
	hideVNModal,
	addNewUserRoom,
	removeUserRoom,
	addUsersRoom,
	setIdRoom,
	elements,
	addNode_Main,
	addNodeBroadcast_Main,
	removeElements_Main,
	setFocusElement_Main,
	setFocusText_Main,
	updatePos_Main,
	onConnectSend_Main,
	onConnectReceive_Main,
	deSelectAll_Main,
	hideFileInfo
}) => {
	// Label for the Node
	const [name, setName] = useState('')

	// Current User's username
	const username = useSelector((state) => state.user.username)

	// Current User's email
	const user_email = user.email

	// Getting the current room
	// const current_room = data.find((idea_board) => idea_board._id === room)

	const pointers = [Pointer1, Pointer2, Pointer3, Pointer4]
	const colors = ['#FF2D92', '#3FDE9C', '#2FDAE4', '#C521FF']

	const color_codes = useRef([])
	const email_indexes = useRef([])

	const onUserJoin = (email) => {
		const length = color_codes.current.length

		if (!email_indexes.current.includes(email)) {
			email_indexes.current.push(email)

			color_codes.current.push({
				email,
				color: colors[length],
				pointer: pointers[length]
			})
		}
	}

	const [pos_updates, setPosUpdates] = useState([])

	useEffect(() => {
		// [Sends Data] - Sends a join request
		socket.emit('joinRoom', { username, room, user_email })

		//[Receives Data] When a use joins the session - Shows a notification
		socket.on('user-connected', (data) => {
			console.log(`[user-connected] ${data.email}`)
			addNewUserRoom(data)
		})

		// [Receives Data] When a user gets disconnected or leaves the session - Shows a notification
		socket.on('user-disconnected', (data) => {
			console.log(`[user-disconnected] ${data.email}`)
			removeUserRoom(data)
		})

		// [Receives Data] This handler receives the current room id on a successful connection
		// and sets the 'room - id' in the redux store for the working ideaboard
		socket.on('successful-connection', (data) => {
			setIdRoom(data.room)
		})

		// [Receives Data] Handler for getting the current users present in the session
		socket.on('room-users', (data) => {
			// console.log(`[room-users] ${JSON.stringify(data.users)}`)
			addUsersRoom(data.users)
		})

		// [Receives Data] A new node is added when someone creates it in the ideaboard
		socket.on('new-node-broadcast', (data) => {
			// console.log(`[new-node-broadcast] ${JSON.stringify(data.node)}`)
			addNodeBroadcast(data.node)
		})

		// [Receives Data] A new node is added when someone creates it in the ideaboard (file)
		socket.on('new-node-file-broadcast', (data) => {
			const node = {
				...data.node,
				data: {
					label: (
						<>
							<MyFileNode
								file_name={data.file_info.file_name}
								file_type={data.file_info.file_type}
								original_file_name={data.file_info.original_file_name}
							/>
						</>
					)
				}
			}

			addNodeBroadcast(node)
		})

		// [Receives Data] Updates the (x,y) position of the nodes when someone updates the positions of the nodes in the ideaboard
		socket.on('new-pos-broadcast', (data) => {
			// console.log(`[new-pos-broadcast] ${JSON.stringify(data.node)}`)
			updatePos_Main(data.node)
		})

		// [Receives Data] Updates the edges when someone updates them in the ideaboard
		socket.on('add-new-edge', (data) => {
			console.log(`[new-edge-connection] ${JSON.stringify(data.edge)}`)
			// setElements((e) => e.concat(data.edge))
			onConnectReceive_Main(data.edge)
		})

		// [Receives Data] Updates the current state of elements
		socket.on('remove-elements', (data) => {
			removeElements_Main(data.elements)
		})

		// Peer pointer updates
		socket.on('user-pointer-updates', (data) => {
			console.log(JSON.stringify(data))
			onUserJoin(data.email)
			setPosUpdates((preVal) => {
				const list = [...preVal.filter((preVal) => preVal.email !== data.email)]

				const user_data = preVal.find((preVal) => preVal.email === data.email)

				const modified_data = { ...user_data, ...data }

				let updated_list = [...list, { ...modified_data }]

				updated_list = updated_list.filter(
					(item) => typeof item.email !== 'undefined'
				)

				// console.log(updated_list)
				return updated_list
			})
		})
	}, [])

	const addNode = () => {
		let node = {}

		// FIXME: Fix the random positon of the node, limit its scope around the previous element
		node = {
			id: uuid4(),
			data: {
				label: name
			},
			type: 'default',
			style: {
				backgroundColor: '#ffffff',
				color: 'black',
				fontFamily: 'Poppins',
				fontWeight: '400',
				minWidth: '100px',
				maxWidth: '400px',
				wordBreak: 'break-word'
			},
			position: {
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight
			}
		}

		addNode_Main(node)

		// Broadcast this to others 🤘
		socket.emit('broadcast-node-added', { room, node })

		// Clear the field
		setName('')
	}

	// Updating the idea board when someone adds a new node
	const addNodeBroadcast = (node) => {
		addNodeBroadcast_Main(node)
	}

	const onNodeDragStart = (event, node) => {
		setFocusElement_Main(node)
		if (node.data !== undefined && typeof node.data.label !== 'object') {
			setFocusText_Main(node.data.label)
		}
		// console.log('drag start', node)
	}

	const onNodeDragStop = (event, node) => {
		// console.log('drag stop', node)
		setFocusElement_Main(node)
		if (node.data !== undefined && typeof node.data.label !== 'object') {
			setFocusText_Main(node.data.label)
		}
		socket.emit('broadcast-node-pos', { room, node })
	}

	const onLoad = (reactFlowInstance) => {
		// console.log('flow loaded:', reactFlowInstance)
		reactFlowInstance.fitView({ padding: 6 })
	}

	const onConnect = (params) => {
		params = {
			...params,
			animated: true,
			type: 'smoothedge',
			style: { cursor: 'pointer' },
			id: uuid4()
		}

		socket.emit('new-edge-added-broadcast', { room, edge: params })

		// return setElements((e) => addEdge(params, e))
		// console.log(`[addEdge] ${addEdge(params, elements)}`)
		onConnectSend_Main(addEdge(params, elements))
	}

	const onConnectEnd = (event) => {
		console.log('[onConnectEnd]')
	}

	const onSelectionChange = (elements) => {
		// FIXME: Fix the node selection handler
		// setFocusElements(elements)
		// console.log('selection change', elements)
	}

	const onMouseMove = (e) => {
		socket.emit('mouse-pointer-broadcast', {
			x: e.nativeEvent.offsetX,
			y: e.nativeEvent.offsetY,
			room,
			username,
			user_email
		})
	}

	// When a node or an edge is clicked
	const onElementClick = (event, element) => {
		setFocusElement_Main(element)

		if (element.data !== undefined) {
			setFocusText_Main(element.data.label)
		}
	}

	// When the pane is clicked / deselect-operation
	const onPaneClick = (event) => {
		deSelectAll_Main()
		setFocusText_Main('')

		// console.log('onPaneClick', event)
	}

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
	const theme = useSelector((state) => state.theme)
	const dark = theme === 'dark'
	return (
		<div className={`main-board ${dark ? '' : 'main-board-light'}`}>
			<ReactFlow
				className={`react-flow-main ${dark ? '' : 'react-flow-main-light'}`}
				onMouseMove={onMouseMove}
				elements={elements}
				onLoad={onLoad}
				style={{ width: '100%', height: '95vh' }}
				onElementClick={onElementClick}
				onPaneClick={onPaneClick}
				onConnect={onConnect}
				onConnectEnd={onConnectEnd}
				onSelectionChange={onSelectionChange}
				connectionLineStyle={{ stroke: '#ddd', strokeWidth: 3 }}
				onNodeDragStart={onNodeDragStart}
				onNodeDragStop={onNodeDragStop}
				snapToGrid={false}>
				{dark ? (
					<Background color='#E0E0E0' gap={50} variant='dots' />
				) : (
					<Background color='#000000' gap={50} variant='dots' />
				)}

				{viewFile.viewFile ? (
					<Rodal
						className={`main-rodal-bg-blur ${
							dark ? '' : 'main-rodal-bg-blur-light'
						}`}
						visible={viewFile.viewFile}
						onClose={() => hideFileInfo()}
						animation='fade'
						width={900}
						height={600}
						customStyles={
							dark ? customStyles.wrapper : customStylesLight.wrapper
						}>
						<ViewFileInfoModal file_info={viewFile} />
					</Rodal>
				) : (
					''
				)}

				<Rodal
					className={`main-rodal-bg-blur ${
						dark ? '' : 'main-rodal-bg-blur-light'
					}`}
					visible={show_vn_modal}
					onClose={() => hideVNModal()}
					animation='fade'
					width={550}
					height={600}
					customStyles={
						dark ? customStyles.wrapper : customStylesLight.wrapper
					}>
					<div
						className={`recorder-header ${
							dark ? '' : 'recorder-header-light'
						}`}>
						<img src={Recording} alt='Recording' />
						<h2>Record your Audio</h2>
					</div>
					<div>
						<div
							className={`react-media-recorder-wrapper ${
								dark ? '' : 'react-media-recorder-wrapper-light'
							}`}>
							<VoiceRecorder />
						</div>
					</div>
				</Rodal>

				{pos_updates
					? pos_updates.map((item, index) => {
							console.log(item, index)

							const s = color_codes.current.find((i) => i.email === item.email)
							const pointer = s['pointer']
							const color = s['color']

							return (
								<div
									key={index}
									className={`peer-pointer ${dark ? '' : 'peer-pointer-light'}`}
									style={{
										position: 'absolute',
										top: `${item.pos.y}px`,
										left: `${item.pos.x}px`
									}}>
									<img
										src={pointer}
										alt={`${item.email}`}
										className={`peer-pointer ${
											dark ? '' : 'peer-pointer-light'
										}`}
									/>
									<h2
										className={`peer-email ${dark ? '' : 'peer-email-light'}`}
										style={{ backgroundColor: color }}>
										{item.username}
									</h2>
								</div>
							)
					  })
					: ''}

				<MiniMap
					className={`mini-map ${dark ? '' : 'mini-map-light'}`}
					nodeColor={(node) => {
						switch (node.type) {
							case 'input':
								return 'red'
							case 'default':
								return '#00ff00'
							case 'output':
								return 'rgb(0,0,255)'
							default:
								return '#eee'
						}
					}}
				/>

				<Controls
					className={`main-controls-plugin ${
						dark ? '' : 'main-controls-plugin-light'
					}`}
				/>
			</ReactFlow>

			<div
				className={`main-node-controls ${
					dark ? '' : 'main-node-controls-light'
				}`}>
				<input
					type='text'
					className={`node-text-input ${dark ? '' : 'node-text-input-light'}`}
					onChange={(e) => setName(e.target.value)}
					value={name}
					name='title'
				/>
				<button
					className={`add-node ${dark ? '' : 'add-node-light'}`}
					type='button'
					onClick={addNode}>
					Add
				</button>
				<img
					className={`voice-note ${dark ? '' : 'voice-note-light'}`}
					src={Recording}
					alt='Voice Note'
					onClick={() => viewVNModal()}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		elements: state.elements,
		focus_element: state.focus.focus_element,
		data: state.idea_boards.boards.data,
		user: state.user,
		viewFile: state.viewFile,
		show_vn_modal: state.voiceNote.show_vn_modal
	}
}

const mapDispatchToProps = {
	addNewUserRoom,
	removeUserRoom,
	addUsersRoom,
	setIdRoom,
	viewVNModal,
	hideVNModal,
	addNode_Main: (data) => ELEMENTS.addNode_Main(data),
	addNodeBroadcast_Main: (data) => ELEMENTS.addNodeBroadcast_Main(data),
	updatePos_Main: (data) => ELEMENTS.updatePos_Main(data),
	onConnectSend_Main: (data) => ELEMENTS.onConnectSend_Main(data),
	onConnectReceive_Main: (data) => ELEMENTS.onConnectReceive_Main(data),
	setFocusElement_Main: (data) => FOCUS.setFocusElement_Main(data),
	removeElements_Main: (data) => ELEMENTS.removeElements_Main(data),
	setFocusText_Main: (data) => FOCUS_TEXT.setFocusText_Main(data),
	deSelectAll_Main: FOCUS.deSelectAll_Main,
	hideFileInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBoard)
