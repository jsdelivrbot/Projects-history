import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
//import Modernizr from 'modernizr';

import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import Icon from 'react-icons-kit';
import { ic_access_time } from 'react-icons-kit/md/ic_access_time';

import styles from './DomaTimePicker-styles.scss'

class DomaTimePicker extends React.Component {

  onChange = value => {
    this.props.onChange(value ? value.format(this.props.format || 'HH:mm') : '');
  }

  render() {
    return (
      <div className={styles.timepicker}>
        <TimePicker
          showSecond={false}
          onChange={this.onChange}
          clearText={'Clear Time'}
          defaultValue={this.props.defaultValue || moment()} style={{ width: this.props.width }}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

DomaTimePicker.propTypes = {
  defaultvalue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func.isRequired,
  format: PropTypes.string,
  width: PropTypes.number,
  disabled: PropTypes.bool,
}
export default DomaTimePicker;
