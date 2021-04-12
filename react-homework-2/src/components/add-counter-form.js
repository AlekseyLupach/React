import React, { Component } from 'react'

export default class AddCounterForm extends Component {
    constructor() {
        super();

        this.state = {
            value: 0,
            min: -5,
            max: 5,
        };
    }

    validateFormValues = (formValues) => {
        const errors = {
            value: [],
            min: [],
            max: [],
        };
        if (Number, isNaN(formValues.value)) {
            errors = {
                ...errors, value: [...errors.value, 'Value shod be  a number']
            }
        }
        if (formValues.min > formValues.max) {
            errors = { ...errors, min: [...errors.min, 'Min cant be more then max'] }
        }

        if (formValues.value > formValues.max) {
            errors = { ...errors, value: [...errors.value, 'Value cant be more then MAX'] }
        }

        if (formValues.value < formValues.min) {
            errors = { ...errors, min: [...errors.min, 'Value cant be less then MIN'] }
        }
    }

    handleInputChange = (e) => {
        const { value, name } = e.target;

        this.setState({
            [name]: value,
        })
    };

    handleSubmit = (e) => {
        const { onSubmit } = this.props;
        const { value, min, max } = this.state;

        e.preventDefault();

        onSubmit({
            value: parseInt(value, 10),
            min: parseInt(min, 10),
            max: parseInt(max, 10),
        });
    }

    render() {
        const { value, min, max } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Value:
                    <input type="number" name="value" value={value} onChange={this.handleInputChange} />
                </label>

                <label>
                    Min:
                    <input type="number" name="min" value={min} onChange={this.handleInputChange} />
                </label>

                <label>
                    Max:
                    <input type="number" name="max" value={max} onChange={this.handleInputChange} />
                </label>

                <button type="submit">Add Counter</button>
            </form>
        )
    }
}
