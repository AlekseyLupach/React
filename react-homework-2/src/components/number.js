import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Number extends Component {

    render() {
        const { value } = this.props;
        return (
            <span>{value}</span>
        )
    }
}

Number.defaultProps = {
    value: 0
};

Number.propTypes = {
    value: PropTypes.number,
}