import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Button extends Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        const { onClick, delta } = this.props;

        onClick(delta);
    }
    render() {
        const { buttonText, disabled } = this.props;

        return (
            <button onClick={this.handleClick} disabled={disabled}>{buttonText}</button>
        )
    }
}

Button.defaultProps = {
    buttonText: 'Text'
};

Button.propTypes = {
    buttonText: PropTypes.string,
    delta: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
}