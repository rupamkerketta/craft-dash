import React, { useState, useEffect } from 'react'
import { useSelector, connect } from 'react-redux'
import '../../../sass/main-board.scss'
import { v4 as uuid4 } from 'uuid'

// React Flow Renderer
import ReactFlow, {
	addEdge,
	Background,
	Controls,
	MiniMap
} from 'react-flow-renderer'

import { addNewUserRoom, removeUserRoom } from '../../../redux/room/roomActions'
import { addUsersRoom, setIdRoom } from '../../../redux/room/roomActions'

// Elements
import * as ELEMENTS from '../../../redux/elements/elementsActions'

// Focus - Elements
import * as FOCUS from '../../../redux/elements/focus-elements/focusElementsActions'
import * as FOCUS_TEXT from '../../../redux/elements/focus-text/focusTextActions'

const MainBoard = ({
	room,
	socket,
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
	deSelectAll_Main
}) => {
	const username = useSelector((state) => state.user.username)
	const email = useSelector((state) => state.user.email)

	const [name, setName] = useState('')

	useEffect(() => {
		// [Sends Data] - Sends a join request
		socket.emit('joinRoom', { username, room, email })

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
		socket.on('successful-connection', (data) => {
			setIdRoom(data.room)
		})

		// [Receives Data] Handler for getting the current users present in the session
		socket.on('room-users', (data) => {
			console.log(`[room-users] ${JSON.stringify(data.users)}`)
			addUsersRoom(data.users)
		})

		// [Receives Data] A new node is added when someone creates it in the ideaboard
		socket.on('new-node-broadcast', (data) => {
			console.log(`[new-node-broadcast] ${JSON.stringify(data.node)}`)
			addNodeBroadcast(data.node)
		})

		// [Receives Data] Updates the (x,y) position of the nodes when someone updates the positions of the nodes in the ideaboard
		socket.on('new-pos-broadcast', (data) => {
			console.log(`[new-pos-broadcast] ${JSON.stringify(data.node)}`)
			updatePos(data.node)
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

		// TODO: Operations -> REMOVE:EDGE, EDIT:EDGE, REMOVE:NODE, EDIT:NODE

		// FIXME: Fix/Update the mouse pointer feature
		// socket.on('user-pointer-updates', (data) => {
		// 	console.log(JSON.stringify(data))
		// })
	}, [])

	const addNode = () => {
		let node = {}
		// setElements((e) => {
		// 	node = {
		// 		id: (e.length + 1).toString(),
		// 		data: { label: `${name}` },
		// 		position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
		// 	}
		// 	return e.concat(node)
		// })
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

	// Updating Node/Idea position (x,y)
	const updatePos = (node) => {
		updatePos_Main(node)
	}

	const onNodeDragStart = (event, node) => {
		setFocusElement_Main(node)
		if (node.data !== undefined) {
			setFocusText_Main(node.data.label)
		}
		console.log('drag start', node)
	}

	const onNodeDragStop = (event, node) => {
		console.log('drag stop', node)
		setFocusElement_Main(node)
		if (node.data !== undefined) {
			setFocusText_Main(node.data.label)
		}
		socket.emit('broadcast-node-pos', { room, node })
	}

	const onLoad = (reactFlowInstance) => {
		console.log('flow loaded:', reactFlowInstance)
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

	// FIXME: Fix the remove handler
	// const onElementsRemove = (elementsToRemove) =>
	// 	setElements((e) => {
	// 		return removeElements(elementsToRemove, e)
	// 	})

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
			email
		})
	}

	// When a node or an edge is clicked
	const onElementClick = (event, element) => {
		// console.log((typeof element.source).toString() === 'undefined')
		// if ((typeof element.source).toString() === 'undefined') {
		// 	setFocusNode_Main(element)
		// } else {
		// 	setFocusEdge_Main(element)
		// }
		setFocusElement_Main(element)
		setFocusText_Main(element.data.label)

		console.log('click', element)
	}

	// When the pane is clicked / deselect-operation
	const onPaneClick = (event) => {
		deSelectAll_Main()
		setFocusText_Main('')

		console.log('onPaneClick', event)
	}

	return (
		<div className='main-board'>
			<ReactFlow
				className='react-flow-main'
				onMouseMove={onMouseMove}
				elements={elements}
				onLoad={onLoad}
				style={{ width: '100%', height: '95vh' }}
				onElementClick={onElementClick}
				onPaneClick={onPaneClick}
				onConnect={onConnect}
				onConnectEnd={onConnectEnd}
				onLoad={onLoad}
				onSelectionChange={onSelectionChange}
				connectionLineStyle={{ stroke: '#ddd', strokeWidth: 3 }}
				onNodeDragStart={onNodeDragStart}
				onNodeDragStop={onNodeDragStop}
				snapToGrid={true}
				snapGrid={[16, 16]}>
				<Background color='#888' gap={16} />

				<MiniMap
					className='mini-map'
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

				<Controls className='main-controls-plugin' />
			</ReactFlow>

			<div className='main-node-controls'>
				<input
					type='text'
					className='node-text-input'
					onChange={(e) => setName(e.target.value)}
					value={name}
					name='title'
				/>
				<button className='add-node' type='button' onClick={addNode}>
					Add
				</button>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		elements: state.elements,
		focus_element: state.focus.focus_element
	}
}

const dispatches = {
	addNewUserRoom,
	removeUserRoom,
	addUsersRoom,
	setIdRoom,
	addNode_Main: (data) => ELEMENTS.addNode_Main(data),
	addNodeBroadcast_Main: (data) => ELEMENTS.addNodeBroadcast_Main(data),
	updatePos_Main: (data) => ELEMENTS.updatePos_Main(data),
	onConnectSend_Main: (data) => ELEMENTS.onConnectSend_Main(data),
	onConnectReceive_Main: (data) => ELEMENTS.onConnectReceive_Main(data),
	setFocusElement_Main: (data) => FOCUS.setFocusElement_Main(data),
	removeElements_Main: (data) => ELEMENTS.removeElements_Main(data),
	setFocusText_Main: (data) => FOCUS_TEXT.setFocusText_Main(data),
	deSelectAll_Main: FOCUS.deSelectAll_Main
}

export default connect(mapStateToProps, { ...dispatches })(MainBoard)
