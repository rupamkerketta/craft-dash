import React, { useState, useEffect } from 'react'
import { useSelector, connect } from 'react-redux'
import '../../../sass/main-board.scss'

import ReactFlow, { addEdge, removeElements, Background, Controls, MiniMap } from 'react-flow-renderer'

import { addNewUserRoom, removeUserRoom } from '../../../redux/room/roomActions'

import { addUsersRoom, setIdRoom } from '../../../redux/room/roomActions'

const initialElements = [ { id: '1', type: 'input', data: { label: 'Craft Dash' }, position: { x: 0, y: 0 } } ]

const MainBoard = ({ room, socket, addNewUserRoom, removeUserRoom, addUsersRoom, setIdRoom }) => {
	const username = useSelector((state) => state.user.username)
	const email = useSelector((state) => state.user.email)

	const [ focusElements, setFocusElements ] = useState(null)
	const [ elements, setElements ] = useState(initialElements)
	const [ name, setName ] = useState('')

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
			setElements((e) => e.concat(data.edge))
		})

		// TODO: Operations -> REMOVE:EDGE, EDIT:EDGE, REMOVE:NODE, EDIT:NODE

		// FIXME: Fix/Update the mouse pointer feature
		socket.on('user-pointer-updates', (data) => {
			console.log(JSON.stringify(data))
		})
	}, [])

	const addNode = () => {
		let node = {}
		setElements((e) => {
			node = {
				id: (e.length + 1).toString(),
				data: { label: `${name}` },
				position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
			}
			return e.concat(node)
		})
		// Broadcast this to others 🤘
		socket.emit('broadcast-node-added', { room, node })
	}

	// Updating the idea board when someone adds a new node
	const addNodeBroadcast = (node) => {
		setElements((e) => e.concat(node))
	}

	// Updating Node/Idea position (x,y)
	const updatePos = (node) => {
		const checkId = (id1, id2) => {
			return id1 === id2
		}

		setElements((e) => {
			const index = e.findIndex((el) => checkId(el.id, node.id))
			console.log(index)
			e[index] = node
			const temp = [ ...e ]
			return temp
		})
	}

	const onNodeDragStart = (event, node) => {
		console.log('drag start', node)
	}

	const onNodeDragStop = (event, node) => {
		console.log('drag stop', node)
		socket.emit('broadcast-node-pos', { room, node })
		console.log(elements)
	}

	const onLoad = (reactFlowInstance) => {
		console.log('flow loaded:', reactFlowInstance)
		reactFlowInstance.fitView()
	}

	const onConnect = (params) => {
		params = {
			...params,
			animated: true,
			id: `${elements.length}-egde-${params.source}-${params.target}`
		}

		socket.emit('new-edge-added-broadcast', { room, edge: params })

		return setElements((e) => addEdge(params, e))
	}

	const onConnectEnd = (event) => {
		console.log('[onConnectEnd]')
	}

	const onElementsRemove = (elementsToRemove) =>
		setElements((e) => {
			return removeElements(elementsToRemove, e)
		})
	const onSelectionChange = (elements) => {
		setFocusElements(elements)
		console.log('selection change', elements)
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

	return (
		<div className='main-board'>
			<ReactFlow
				onMouseMove={onMouseMove}
				elements={elements}
				onLoad={onLoad}
				style={{ width: '100%', height: '88vh' }}
				onConnect={onConnect}
				onConnectEnd={onConnectEnd}
				onLoad={onLoad}
				onSelectionChange={onSelectionChange}
				connectionLineStyle={{ stroke: '#ddd', strokeWidth: 3 }}
				onNodeDragStart={onNodeDragStart}
				onNodeDragStop={onNodeDragStop}
				snapToGrid={true}
				snapGrid={[ 16, 16 ]}
			>
				<Background color='#888' gap={16} />
				<MiniMap
					className='mini-map'
					nodeColor={(n) => {
						if (n.type === 'input') return 'blue'

						return '#FFCC00'
					}}
				/>
				<Controls className='main-controls-plugin' />
			</ReactFlow>

			<div className='main-node-controls'>
				<input type='text' className='node-text-input' onChange={(e) => setName(e.target.value)} name='title' />
				<button className='add-node' type='button' onClick={addNode}>
					Add Node
				</button>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		state: state
	}
}

export default connect(mapStateToProps, { addNewUserRoom, removeUserRoom, addUsersRoom, setIdRoom })(MainBoard)