import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
      minutes: this.props.startMinutes && this.props.startMinutes > 0 ? this.props.startMinutes : 0,
    };
    this.selectedFormat = this.props.startMinutes > 60 ? 'HH:mm:ss' : 'mm:ss';
    this.format = this.props.format ? this.props.format : this.selectedFormat;
  }

  componentDidMount() {
    this.startTimmer(); // Start the timer after mount
  }

  componentWillUnmount = () => {
    clearInterval(this.interval); // clear the interval after unmount

    // If onfinished function is passed call it
    if (this.props.onFinished) {
      this.props.onFinished();
    }
  }

  startTimmer = () => {
    this.interval = setInterval(() => this.displayTime(), 1000);
  }

 /*
  Run Revrese clock
 */
  reverseTimer = () => {
    if (moment('2017-08-03T00:00:00').minute(this.state.minutes).second(this.state.seconds).format('HH:mm:ss') !== '00:00:00') {
      this.setState(
        {
          seconds: this.state.seconds - 1,
        });
    } else {
      clearInterval(this.interval); // If the timer reached 0 cancel it

      // If onfinished function is passed call it
      if (this.props.onFinished) {
        this.props.onFinished();
      }
    }
  }

  /*
   Run forward timmer
  */
  forwardTimer =() => {
    this.setState(
      {
        seconds: this.state.seconds + 1,
      });
  }

  displayTime = () => {
    if (this.props.reverse) {
      this.reverseTimer();
    } else {
      this.forwardTimer();
    }
  }

  render() {
    return (
      <span className={this.props.className ? this.props.className : ''} style={this.props.style ? this.props.style : {}}>
        {moment('2017-08-03T00:00:00').minute(this.state.minutes).second(this.state.seconds).format(this.format)}
      </span>
    );
  }
}

Counter.propTypes = {
  startMinutes: PropTypes.number.isRequired,
  reverse: PropTypes.bool,
  onFinished: PropTypes.func,
  format: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Counter;
