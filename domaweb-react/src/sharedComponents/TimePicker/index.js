import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

import 'rc-time-picker/assets/index.css';
import './TimePicker-styles.scss';

class DomacareTimePicker extends React.PureComponent {

  render() {
    return (
      <TimePicker defaultValue={moment()} showSecond={false} />
    )
  }
}

export default DomacareTimePicker;
