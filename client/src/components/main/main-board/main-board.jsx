// import React, { useState } from 'react'
// import ReactFlow, { MiniMap, Controls, removeElements } from 'react-flow-renderer'
// import '../../../sass/main-board.scss'

// function MainBoard() {
// 	const [ elements, setElements ] = useState([
// 		{ id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 }, style: { fontFamily: 'Poppins' } },
// 		{ id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 }, style: { fontFamily: 'Poppins' } },
// 		{
// 			id: 'e1-2',
// 			source: '1',
// 			target: '2',
// 			animated: true,
// 			labelBgBorderRadius: 4,
// 			label: 'animated',
// 			style: { stroke: '#ffffff' }
// 		}
// 	])

// 	const update = () => {
// 		setElements(elements.splice(2, 1))
// 	}

// 	return (
// 		<div className='main-board'>
// 			<ReactFlow className='my-graph' elements={elements}>
// 				<MiniMap
// 					nodeColor={(node) => {
// 						switch (node.type) {
// 							case 'input':
// 								return 'red'
// 							case 'default':
// 								return '#00ff00'
// 							case 'output':
// 								return 'rgb(0,0,255)'
// 							default:
// 								return '#eee'
// 						}
// 					}}
// 				/>
// 				<Controls className='main-controls' />
// 			</ReactFlow>
// 		</div>
// 	)
// }

// export default MainBoard

import React, { useState, useEffect, Fragment } from 'react'
import '../../../sass/main-board.scss'

import ReactFlow, { addEdge, removeElements, Background, Controls, MiniMap } from 'react-flow-renderer'

const initialElements = [ { id: '1', type: 'input', data: { label: 'Craft Dash' }, position: { x: 0, y: 0 } } ]

const MainBoard = ({ room, socket }) => {
	const [ focusElemens, setFocusElements ] = useState(null)
	const [ elements, setElements ] = useState(initialElements)
	const [ name, setName ] = useState('')

	const checkId = (el, id) => {
		return el === id
	}

	useEffect(() => {
		socket.on('node-drag-stop', (data) => {
			console.log(data)

			let temp = [ ...elements ]
			let updated_element = data.node

			console.log(updated_element)

			const index = elements.findIndex((el) => checkId(el.id, data.node.id))

			console.log(index)
			// temp[index] = updated_element

			// console.log(temp)

			// setElements([ ...temp ])
		})

		socket.on('receive-add-node', (data) => {
			console.log(`[add-node] ${data}`)
			addNodeLive(data.node)
		})
	}, [])

	const addNode = () => {
		let node

		setElements((e) => {
			node = {
				id: (e.length + 1).toString(),
				data: { label: `${name}` },
				position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
			}
			return e.concat(node)
		})
		socket.emit('send-add-node', { room, node })
	}

	const addNodeLive = (node) => {
		setElements((e) => e.concat(node))
	}

	const onNodeDragStart = (event, node) => console.log('drag start', node)
	const onNodeDragStop = (event, node) => {
		console.log('drag stop', node)
		socket.emit('on-drag-stop', { room, node })
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
