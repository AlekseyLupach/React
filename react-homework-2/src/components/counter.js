import { Component } from 'react';
import '../styles/App.css';
import Button from './button';
import Number from './number';
import PropTypes from 'prop-types';
import DeleteBtn from './delete-btn';


class Counter extends Component {
  constructor(props) {
    super();

    this.state = {
      number: props.data.value,
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
    const { onChange, data } = this.props;
    onChange(data.id, (data.value + delta))
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
    const {
      data: { max, min, value: number } } = this.props;
    return (
      <div>
        <Button onClick={this.handleChange} buttonText="-" delta={-1} disabled={number <= min} />
        <Number value={number} />
        <Button onClick={this.handleChange} buttonText="+" delta={+1} disabled={number >= max} />
        <DeleteBtn onClick={this.props.deleteCounter} />
      </div>
    );
  }
}

Counter.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
  }),
};

export default Counter;
