import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import CustomInput from '../CustomInput';
import { urlDate } from '../../../utils/dateUtil';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class CustomDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(this.props.currentDate),
    };
  }

  handleChange = date => {
    this.setState({
      startDate: date,
    });
    this.props.changeDate(date);
    console.log(date);
  }

  render() {
    return (
      <DatePicker
        customInput={<CustomInput />}
        selected={moment(this.props.currentDate)}
        onChange={this.handleChange}
      />
    );
  }
}

export default CustomDatePicker;
