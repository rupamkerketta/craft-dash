import React, { useState, useEffect, Fragment } from 'react'
import '../../../sass/main-board.scss'

import ReactFlow, { addEdge, removeElements, Background, Controls, MiniMap } from 'react-flow-renderer'

const initialElements = [ { id: '1', type: 'input', data: { label: 'Craft Dash' }, position: { x: 0, y: 0 } } ]

const MainBoard = ({ room, socket }) => {
	const [ focusElemens, setFocusElements ] = useState(null)
	const [ elements, setElements ] = useState(initialElements)
	const [ name, setName ] = useState('')

	useEffect(() => {
		socket.emit('joinRoomMain', { room })

		socket.on('new-node-broadcast', (data) => {
			console.log(`[new-node-broadcast] ${JSON.stringify(data.node)}`)
			addNodeBroadcast(data.node)
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

	const addNodeBroadcast = (node) => {
		setElements((e) => e.concat(node))
	}

	const onNodeDragStart = (event, node) => {
		console.log('drag start', node)
	}

	const onNodeDragStop = (event, node) => {
		console.log('drag stop', node)
	}

	const onLoad = (reactFlowInstance) => {
		console.log('flow loaded:', reactFlowInstance)
		reactFlowInstance.fitView()
	}

	const onConnect = (params) => {
		console.log(params)
		params = {
			...params,
			animated: true
		}
		return setElements((e) => addEdge(params, e))
	}
	const onElementsRemove = (elementsToRemove) => setElements((e) => removeElements(elementsToRemove, e))
	const onSelectionChange = (elements) => {
		setFocusElements(elements)
		console.log('selection change', elements)
	}

	return (
		<div className='main-board'>
			<ReactFlow
				elements={elements}
				onLoad={onLoad}
				style={{ width: '100%', height: '90vh' }}
				onConnect={onConnect}
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
				<Controls />
			</ReactFlow>

			<div>
				<input type='text' onChange={(e) => setName(e.target.value)} name='title' />
				<button type='button' onClick={addNode}>
					Add Node
				</button>
				<button type='button' onClick={() => onElementsRemove(focusElemens)}>
					Remove
				</button>
			</div>
		</div>
	)
}

export default MainBoard
