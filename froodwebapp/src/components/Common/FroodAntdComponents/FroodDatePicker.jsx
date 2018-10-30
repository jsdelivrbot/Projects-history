import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';
import { datePicker } from 'styles/common.scss';

class FroodDatePicker extends PureComponent {
  handleChange = (date, dateString) => {
    this.props.onChange(dateString, this.props.id, this.props.columnName);
  }

  render() {
    const {
      id,
      value
    } = this.props;

    return (
      <DatePicker
        id={ id }
        className={ datePicker }
        onChange={ this.handleChange }
        allowClear={ false }
        showTime={ false }
        size="default"
        format="DD-MMMM-YYYY"
        value={ value && moment(value, 'DD-MMMM-YYYY') }
      />
    );
  }
}

FroodDatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  columnName: PropTypes.string,
};

export default FroodDatePicker;
