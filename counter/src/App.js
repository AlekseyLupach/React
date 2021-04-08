import React, { Component } from 'react';
import Counter from './counter';

export default class App extends Component {
    render() {
        return (
            <div>
                <Counter max={5} min={-5} />
                <Counter max={2} min={-0}/>
                <Counter />
            </div>
        )
    }
}
