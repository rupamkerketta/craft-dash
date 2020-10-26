import React from "react"
import { connect } from 'react-redux'

import "../../../sass/edit.scss"

const Edit = ({ focus_node }) => {
    return (
        <div className='edit-sidebar'>
            <div className='edit-sidebar-wrapper'>
                <ElementGroup
                    data={{
                        label: "#id",
                        content: focus_node.id,
                        label_width: "20%",
                        content_width: "80%",
                    }}
                />

                <div className='co'>
                    <div className='x-co'>
                        <ElementGroup
                            data={{
                                label: "x :",
                                content: focus_node.position === undefined ? 'Na' : Math.floor(focus_node.position.x),
                                label_width: "40%",
                                content_width: "60%",
                            }}
                        />
                    </div>
                    <div className='y-co'>
                        <ElementGroup
                            data={{
                                label: "y :",
                                content: focus_node.position === undefined ? 'Na' : Math.floor(focus_node.position.y),
                                label_width: "40%",
                                content_width: "60%",
                            }}
                        />
                    </div>
                </div>

                <div className='fg-bg'>
                    <ElementGroup
                        data={{
                            label: "fg",
                            content: "7",
                            label_width: "40%",
                            content_width: "60%",
                        }}
                    />
                    <ElementGroup
                        data={{
                            label: "bg",
                            content: "7",
                            label_width: "40%",
                            content_width: "60%",
                        }}
                    />
                </div>

                <div className='text'>
                    <ElementGroup
                        data={{
                            label: "text",
                            content: focus_node.data === undefined ? ' ' : focus_node.data.label,
                            label_width: "100%",
                            content_width: "100%",
                        }}
                    />
                </div>

                <div className='edit-update-btn'>
                    <button>update</button>
                </div>

                <div className='edit-remove-btn'>
                    <button>remove</button>
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
        focus_node: state.focus.focus_node
    }
}

export default connect(mapStateToProps, {})(Edit)
