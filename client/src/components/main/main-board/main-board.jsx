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

import React, { useState, Fragment } from 'react'
import '../../../sass/main-board.scss'

import ReactFlow, { addEdge, removeElements, Background, Controls, MiniMap } from 'react-flow-renderer'

const initialElements = [ { id: '1', type: 'input', data: { label: 'Craft Dash' }, position: { x: 0, y: 0 } } ]
const onLoad = (reactFlowInstance) => {
	reactFlowInstance.fitView()
}

const MainBoard = () => {
	const [ focusElemens, setFocusElements ] = useState(null)
	const [ elements, setElements ] = useState(initialElements)
	const [ name, setName ] = useState('')

	const addNode = () => {
		setElements((e) =>
			e.concat({
				id: (e.length + 1).toString(),
				data: { label: `${name}` },
				position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
			})
		)
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
				onSelectionChange={onSelectionChange}
				connectionLineStyle={{ stroke: '#ddd', strokeWidth: 3 }}
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
