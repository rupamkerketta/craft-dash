import React from 'react'
import { connect } from 'react-redux'

import '../../../sass/edit.scss'

import { deSelectAll_Main } from '../../../redux/elements/focus-elements/focusElementsActions'
import { removeNode_Main } from '../../../redux/elements/elementsActions'

import { removeElements } from 'react-flow-renderer'

const Edit = ({ socket, room, focus_node, elements, removeNode_Main, deSelectAll_Main }) => {


    const removeHandler = () => {
        if (focus_node.data !== undefined) {
            console.log(focus_node, elements)
            removeNode_Main(removeElements([focus_node], elements))

            // [Sends Data]
            socket.emit('remove-elements-broadcast', { elements: removeElements([focus_node], elements,), room })

            deSelectAll_Main()
        }
    }

    return (
        <div className='edit-sidebar'>
            <div className='edit-sidebar-wrapper'>
                <div className='el-id'>
                    <ElementGroup
                        data={{
                            label: '#id',
                            content: focus_node.id,
                            label_width: '20%',
                            content_width: '80%',
                        }}
                    />
                </div>

                <div className='co'>
                    <div className='x-co'>
                        <ElementGroup
                            data={{
                                label: 'x :',
                                content:
                                    focus_node.position === undefined
                                        ? 'Na'
                                        : Math.floor(focus_node.position.x),
                                label_width: '40%',
                                content_width: '60%',
                            }}
                        />
                    </div>
                    <div className='y-co'>
                        <ElementGroup
                            data={{
                                label: 'y :',
                                content:
                                    focus_node.position === undefined
                                        ? 'Na'
                                        : Math.floor(focus_node.position.y),
                                label_width: '40%',
                                content_width: '60%',
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
                            content_width: '60%',
                        }}
                    />
                    <ElementGroup
                        data={{
                            label: 'bg',
                            content: '7',
                            label_width: '40%',
                            content_width: '60%',
                        }}
                    />
                </div>

                <div className='text'>
                    <ElementGroup
                        data={{
                            label: 'text',
                            content:
                                focus_node.data === undefined ? ' ' : focus_node.data.label,
                            label_width: '100%',
                            content_width: '100%',
                        }}
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
                style={{ width: props.data.content_width }}
            >
                <h3 className='field-content'>{props.data.content}</h3>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        elements: state.elements,
        focus_node: state.focus.focus_node,
    }
}

const dispatches = {
    removeNode_Main,
    deSelectAll_Main
}

export default connect(mapStateToProps, { ...dispatches })(Edit)
