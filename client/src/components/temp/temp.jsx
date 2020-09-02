import React, { useEffect, useState, useRef, useMemo } from 'react'
import * as d3 from 'd3'

const Temp = () => {
	const myRef = useRef(null)

	const [ data, setData ] = useState([ 10, 20, 25 ])

	// Transition
	const t = d3.transition().duration(750)

	const drawCircle = () => {
		const svg = d3.select(myRef.current).append('svg').attr('width', 400).attr('height', 400)

		const g = svg.append('g').attr('width', 380).attr('height', 380).attr('transform', `translate(${20}, ${20})`)

		d3.interval(() => {
			update(data, g)
		}, 1000)

		update(data, g)
	}

	const update = useMemo((data, g) => {
		setData([ Math.random() * 100, Math.random() * 100, Math.random() * 100 ])
		const circles = g.selectAll('circle').data(data)

		// EXIT old elements not present in new data.
		circles.exit().transition(t).remove()

		// UPDATE old elements present in new data.
		circles.transition(t).attr('r', (data, index) => {
			return data
		})

		// ENTER new elements present in new data.
		circles
			.enter()
			.append('circle')
			.merge(circles)
			.transition(t)
			.attr('cx', (data, index) => {
				return (index + 1) * 60
			})
			.attr('cy', 50)
			.attr('r', (data, index) => {
				return data
			})
			.attr('fill', 'grey')
	})

	useEffect(
		() => {
			drawCircle()
		}
		// [ data ]
	)

	return (
		<div className='temp'>
			<h2>Temp</h2>
			<div ref={myRef} />
		</div>
	)
}

export default Temp
