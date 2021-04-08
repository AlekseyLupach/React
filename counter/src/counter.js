import { Component } from 'react';
import './App.css';
import Button from './button';
import Number from './number';
import PropTypes from 'prop-types'


class Counter extends Component {
  constructor() {
    super();

    this.state = {
      number: 0
    };

    //привязка к this
    this.handleChange = this.handleChange.bind(this);
    // this.handleIncrement = this.handleIncrement.bind(this);
    // this.handleDecrement = this.handleDecrement.bind(this);
  }

  // handleIncrement = () => {
  //   this.setState({
  //     number: this.state.number + 1
  //   })
  // }

  handleChange(delta) {
    this.setState({
      number: this.state.number + delta,
    });
  }


  // handleIncrement() {
  //   this.setState({
  //     number: this.state.number + 1
  //   })
  // }

  // handleDecrement() {
  //   this.setState({
  //     number: this.state.number - 1
  //   })
  // }

  render() {
    const { number } = this.state;
    const { max, min } = this.props;
    return (
      <div>
        <Button onClick={this.handleChange} buttonText="-" delta={-1} disabled={number <= min} />
        <Number value={number} />
        <Button onClick={this.handleChange} buttonText="+" delta={+1} disabled={number >= max} />
      </div>
    );
  }
}

Counter.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
}

export default Counter;
