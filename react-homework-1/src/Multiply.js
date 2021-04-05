import React, { Component } from 'react';

export default class Multiply extends Component {
    render() {
        const { a, b } = this.props
        return (
            <p>
                {a * b}
            </p>
        );
    }
}
