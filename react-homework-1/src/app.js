import React, { Component } from 'react';
import HelloMessage from './HelloMessage';
import Multiply from './Multiply';
import ImageOrButton from './ImageOrButton';

export default class App extends Component {
    render() {
        const name = "Aliaksei";
        const a = 5;
        const b = 2;
        return (
            <div>
                <HelloMessage myName={name} />
                <Multiply multiply={a * b} />
                <ImageOrButton />
            </div>
        );
    }
}


