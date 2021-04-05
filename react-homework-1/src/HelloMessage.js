import React, { Component } from 'react';

export default class HelloMessage extends Component {
    render() {

        const { myName } = this.props
        return (
            <div>
                Hello, {myName}
            </div>
        );
    }
}
