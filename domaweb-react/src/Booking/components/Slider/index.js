import React from 'react';
import PropTypes from 'prop-types';
import InputRange, { createSliderWithTooltip } from 'rc-slider';
import moment from 'moment';

import 'rc-slider/assets/index.css';

import styles from './Slider-styles.scss';

const SliderWithTooltip = createSliderWithTooltip(InputRange);

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ((this.props.visibleTimeStart !== nextProps.visibleTimeStart) ||
        (this.props.visibleTimeEnd !== nextProps.visibleTimeEnd)
    ) {
      const timeDiff = moment(nextProps.visibleTimeEnd).diff(nextProps.visibleTimeStart, 'hours');
      if (timeDiff >= 0 && timeDiff <= 168) {
        this.setState({ value: timeDiff });
      }
    }
  }

  handleChange = (value) => {
    if (value >= 3 && value <= 24) {
      this.setState({ value });
    } else if (value > 24 && value <= 34) {
      this.setState({ value: 24 });
    } else if (value > 34 && value <= 58) {
      this.setState({ value: 48 });
    } else if (value > 58 && value <= 82) {
      this.setState({ value: 72 });
    } else if (value > 82 && value <= 106) {
      this.setState({ value: 96 });
    } else if (value > 106 && value <= 130) {
      this.setState({ value: 120 });
    } else if (value > 130 && value <= 154) {
      this.setState({ value: 144 });
    } else if (value > 154 && value <= 178) {
      this.setState({ value: 168 });
    }
  }

  labelClick = (value) => {
    if (value === 0) {
      this.setState({ value: 3 }, () => this.changeZoom(this.state.value));
    } else {
      this.setState({ value: value * 24 }, () => this.changeZoom(this.state.value));
    }
  }

  formatToolTip = (value) => {
    const diffDuration = moment.duration(value, 'hours');
    const days = diffDuration.days();
    const hours = diffDuration.hours();

    const totalDays = days === 0 ? '' : `${days}d`;
    const totalHours = hours === 0 ? '' : `${hours}h`;

    return `${totalDays} ${totalHours}`;
  };

  render() {
    return (
      <div className="slider-wrapper">
        <div className={styles.scale_wrapper}>
          <span onClick={() => this.labelClick(0)}>0</span>
          <span onClick={() => this.labelClick(1)}>1</span>
          <span onClick={() => this.labelClick(2)}>2</span>
          <span onClick={() => this.labelClick(3)}>3</span>
          <span onClick={() => this.labelClick(4)}>4</span>
          <span onClick={() => this.labelClick(5)}>5</span>
          <span onClick={() => this.labelClick(6)}>6</span>
          <span onClick={() => this.labelClick(7)}>7</span>
        </div>
        <SliderWithTooltip
          step={1}
          defaultValue={0}
          min={0}
          max={168}
          className="slider_zoom"
          value={this.state.value}
          onChange={this.handleChange}
          onAfterChange={this.props.changeZoom}
          tipProps={{ placement: 'bottom' }}
          tipFormatter={value => this.formatToolTip(value)}
        />
      </div>
    );
  }
}

Slider.propTypes = {
  changeZoom: PropTypes.func,
  visibleTimeStart: PropTypes.number,
  visibleTimeEnd: PropTypes.number,
};

export default Slider;
