import React, { Component } from 'react';
import imgSrc from './111.jpg'

export default class ImageOrButton extends Component {
    render() {
        const { isButton } = this.props
        if (isButton)
            return (
                <button>Кнопка</button>
            );
        else {
            return (
                <img src={imgSrc}></img>
            );
        }
    }
}
