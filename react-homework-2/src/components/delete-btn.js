import React, { Component } from 'react'

export default class DeleteBtn extends Component {
    render() {
        return (
            <button onClick={this.props.onClick}>Delete</button>
        )
    }
}