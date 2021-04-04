import React, { Component } from 'react';

export default class Multiply extends Component {
    render() {
        const { multiply } = this.props
        return (
            <p>
                {multiply}
            </p>
        );
    }
}
