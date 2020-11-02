import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import '../../../sass/edit.scss'

import { deSelectAll_Main } from '../../../redux/elements/focus-elements/focusElementsActions'
import {
	removeElements_Main,
	onTextChange_Main
} from '../../../redux/elements/elementsActions'

import { removeElements } from 'react-flow-renderer'

const Edit = ({
	socket,
	room,
	focus_element,
	elements,
	removeElements_Main,
	onTextChange_Main,
	deSelectAll_Main
}) => {
	const removeHandler = () => {
		if (focus_element !== undefined) {
			removeElements_Main(removeElements([focus_element], elements))

			// [Sends Data]
			socket.emit('remove-elements-broadcast', {
				elements: removeElements([focus_element], elements),
				room
			})

			deSelectAll_Main()
		}
	}

	const onTextChange = (e) => {
		onTextChange_Main({ id: focus_element.id, text: e.target.value })
	}

	return (
		<div className='edit-sidebar'>
			<div className='edit-sidebar-wrapper'>
				<div className='el-id'>
					<ElementGroup
						data={{
							label: '#id',
							content: focus_element.id,
							label_width: '20%',
							content_width: '80%'
						}}
					/>
				</div>

				<div className='co'>
					<div className='x-co'>
						<ElementGroup
							data={{
								label: 'x :',
								content:
									focus_element.position === undefined
										? 'Na'
										: Math.floor(focus_element.position.x),
								label_width: '40%',
								content_width: '60%'
							}}
						/>
					</div>
					<div className='y-co'>
						<ElementGroup
							data={{
								label: 'y :',
								content:
									focus_element.position === undefined
										? 'Na'
										: Math.floor(focus_element.position.y),
								label_width: '40%',
								content_width: '60%'
							}}
						/>
					</div>
				</div>

				<div className='fg-bg'>
					<ElementGroup
						data={{
							label: 'fg',
							content: '7',
							label_width: '40%',
							content_width: '60%'
						}}
					/>
					<ElementGroup
						data={{
							label: 'bg',
							content: '7',
							label_width: '40%',
							content_width: '60%'
						}}
					/>
				</div>

				<div className='text'>
					<ElementGroup
						data={{
							label: 'text',
							content:
								focus_element.data === undefined
									? ' '
									: focus_element.data.label,
							label_width: '100%',
							content_width: '100%'
						}}
						textChangeHandler={onTextChange}
					/>
				</div>

				<div className='edit-update-btn'>
					<button>update</button>
				</div>

				<div className='edit-remove-btn'>
					<button onClick={removeHandler}>remove</button>
				</div>
			</div>
		</div>
	)
}

const ElementGroup = (props) => {
	return (
		<div className='edit-group'>
			<h3 className='field-label' style={{ width: props.data.label_width }}>
				{props.data.label}
			</h3>
			<div
				className='field-content-wrapper'
				style={{ width: props.data.content_width }}>
				{props.data.label === 'text' ? (
					<textarea
						className='field-content-textarea'
						rows='4'
						cols='20'
						value={props.data.content}
						onChange={props.textChangeHandler}
					/>
				) : (
					<h3 className='field-content'>{props.data.content}</h3>
				)}
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
	removeElements_Main,
	onTextChange_Main,
	deSelectAll_Main
}

export default connect(mapStateToProps, { ...dispatches })(Edit)
