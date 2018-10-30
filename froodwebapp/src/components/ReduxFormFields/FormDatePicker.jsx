import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';
import { datePicker } from 'styles/common.scss';

const disabledDate = (firstActiveDate, lastActiveDate) => currentDate => (
  // Can not select days before firstActiveDate and lastActiveDate
  currentDate
  && firstActiveDate
  && lastActiveDate
  && (currentDate.startOf('day').valueOf() < firstActiveDate.valueOf()
  || currentDate.startOf('day').valueOf() > lastActiveDate.valueOf())
);

const disabledDateBeforeToday = currentDate =>
  // Can not select days before today
  currentDate && currentDate.startOf('day').valueOf() < moment().startOf('day').valueOf();

class FormDatePicker extends Component {
  handleChange = (date, dateString) => {
    this.props.input.onChange(dateString);
  }

  render() {
    const {
      input: {
        value
      },
      disabled,
      activeFromToday,
      firstActiveDate,
      lastActiveDate
    } = this.props;

    const disabledDateFunc = activeFromToday
      ? disabledDateBeforeToday
      : disabledDate(firstActiveDate, lastActiveDate);

    return (
      <DatePicker
        disabled={ disabled }
        disabledDate={ disabledDateFunc }
        onChange={ this.handleChange }
        allowClear={ false }
        showTime={ false }
        showToday={ false }
        className={ datePicker }
        size="default"
        format="DD-MMMM-YYYY"
        value={ (value && moment(value, 'DD-MMMM-YYYY')) || null }
      />
    );
  }
}

FormDatePicker.propTypes = {
  input: PropTypes.object,
  disabled: PropTypes.bool,
  activeFromToday: PropTypes.bool,
  firstActiveDate: PropTypes.object,
  lastActiveDate: PropTypes.object,
};

export default FormDatePicker;
