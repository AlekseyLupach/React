import React, { Component } from 'react';
import * as yup from 'yup';

export default class AddCounterForm extends Component {
    constructor() {
        super();

        this.state = {
            formValues: {
                value: 0, min: -5, max: 5
            },
            errors: {}
        };

        this.validationSchema = yup.object().shape({
            value:
                yup.number('Value should be a number').required('Value should be a number')
                    .lessThan(yup.ref('max'), 'Value should be in range between min and max')
                    .moreThan(yup.ref('min'), 'Value should be in range between min and max'),
            min: yup.number().required().lessThan(yup.ref('max')),
            max: yup.number().required().moreThan(yup.ref('max')),
        });
    }

    handleInputChange = (e) => {
        const { value, name } = e.target;
        const { formValues } = this.state;

        this.setState({
            formValues: { ...formValues, [name]: value },
        })
    };

    handleSubmit = (e) => {
        const { onSubmit } = this.props;
        const { formValues: { value, min, max }, } = this.state;

        e.preventDefault();

        const values = {
            value: parseInt(value, 10),
            min: parseInt(min, 10),
            max: parseInt(max, 10),
        };

        const errors = Object.keys(values).reduce((result, key) => {
            try {
                this.validationSchema.validateSyncAt(key, value);

                return result;
            } catch (e) {
                return { ...result, [key]: e.message }
            }
        }, {});

        if (!Object.keys(errors).lenght) {
            onSubmit(values);
        }

        this.setState({ errors })
    }

    render() {
        const { formValues: { value, min, max }, errors } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Value:
                    <input type="number" name="value" value={value} onChange={this.handleInputChange} />
                    </label>
                    <p>{errors.value}</p>
                </div>

                <div>
                    <label>
                        Min:
                    <input type="number" name="min" value={min} onChange={this.handleInputChange} />
                    </label>
                    <p>{errors.value}</p>
                </div>

                <div>
                    <label>
                        Max:
                    <input type="number" name="max" value={max} onChange={this.handleInputChange} />
                    </label>
                    <p>{errors.max}</p>
                </div>
                <button type="submit">Add Counter</button>
            </form>
        )
    }
}
