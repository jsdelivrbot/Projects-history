import React, { PureComponent } from 'react';
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

const disabledDateAfterToday = currentDate =>
  // Can not select days after today and today
  currentDate >= moment().subtract(1, 'days');

class GridDatePicker extends PureComponent {
  onChange = (date, dateString) => {
    this.props.onChange(dateString, this.props.index, this.props.propName);
  }

  render() {
    const {
      disabled = false,
      activeFromToday,
      activeBeforeToday,
      firstActiveDate,
      lastActiveDate,
      value
    } = this.props;

    let disabledDateFunc;

    if (activeFromToday) {
      disabledDateFunc = disabledDateBeforeToday;
    } else if (activeBeforeToday) {
      disabledDateFunc = disabledDateAfterToday;
    } else {
      disabledDateFunc = disabledDate(firstActiveDate, lastActiveDate);
    }

    return (
      <DatePicker
        allowClear={ false }
        showTime={ false }
        value={ value && moment(value, 'DD-MMMM-YYYY') }
        className={ datePicker }
        size="default"
        format="DD-MMMM-YYYY"
        disabledDate={ disabledDateFunc }
        disabled={ disabled }
        onChange={ this.onChange }
      />
    );
  }
}

GridDatePicker.propTypes = {
  value: PropTypes.any,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  propName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  activeFromToday: PropTypes.bool,
  activeBeforeToday: PropTypes.bool,
  firstActiveDate: PropTypes.object,
  lastActiveDate: PropTypes.object,
};

export default GridDatePicker;
