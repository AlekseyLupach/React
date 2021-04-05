import React, { Component } from 'react';
import HelloMessage from './HelloMessage';
import Multiply from './Multiply';
import ImageOrButton from './ImageOrButton';

export default class App extends Component {
    render() {
        const name = "Aliaksei";
        return (
            <div>
                <HelloMessage myName={name} />
                <Multiply a="5" b="3" />
                <ImageOrButton isButton={true} />
            </div>
        );
    }
}


