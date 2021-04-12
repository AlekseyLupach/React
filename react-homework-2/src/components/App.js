import React, { Component } from 'react';
import Counter from './counter';
import generateId from '../utils/index';
import AddCounterForm from '../components/add-counter-form';

export default class App extends Component {

    constructor() {
        super();

        this.state = {
            counters: [
                { id: 1, value: 0, min: -5, max: 5 },
                { id: 2, value: 6, min: 0, max: 10 },
                { id: 3, value: -3, min: -3, max: 9 },
            ]
        }
        this.handleChange = this.handleChange.bind(this);
        this.addCounter = this.addCounter.bind(this);
    }

    handleChange(id, value) {

        const { counters } = this.state;
        const newCounters = counters.map(counter => {
            if (id === counter.id) {
                return { ...counter, value };
            }

            return counter;
        })

        this.setState({
            counters: newCounters,
        })
    }

    addCounter(formvalues) {
        const { counters } = this.state;

        const newCounters = [...counters, { id: generateId(counters), ...formvalues }]

        this.setState({
            counters: newCounters,
        })
    }

    deleteCounter = (id) => {
        const { counters } = this.state;
        const newCounters = counters.filter((counter) => counter.id !== id);

        this.setState({
            counters: newCounters
        })
    }

    render() {

        const { counters } = this.state;
        return (
            <div>
                {counters.map((counters =>
                    <Counter
                        data={counters} key={counters.id}
                        onChange={this.handleChange}
                        deleteCounter={() => this.deleteCounter(counters.id)}
                    />
                ))}
                <AddCounterForm onSubmit={this.addCounter} />
            </div>
        )
    }
}
