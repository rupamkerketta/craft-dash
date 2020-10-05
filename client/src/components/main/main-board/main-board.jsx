import React from 'react'
import ReactFlow, { MiniMap, Controls } from 'react-flow-renderer'
import '../../../sass/main-board.scss'

function MainBoard() {
	return (
		<div className='main-board'>
			<BasicFlow />
		</div>
	)
}

const elements = [
	{ id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 }, style: { fontFamily: 'Poppins' } },
	// you can also pass a React component as a label
	{ id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 }, style: { fontFamily: 'Poppins' } },
	{
		id: 'e1-2',
		source: '1',
		target: '2',
		animated: true,
		labelBgBorderRadius: 4,
		label: 'animated',
		style: { stroke: 'red' }
	}
]

const BasicFlow = () => (
	<ReactFlow className='my-graph' elements={elements}>
		<MiniMap
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
		<Controls className='main-controls' />
	</ReactFlow>
)

export default MainBoard
