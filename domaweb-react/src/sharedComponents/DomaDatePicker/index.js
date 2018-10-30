import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';

import DomaDatePickerFormat from '../DomaDatePickerFormat';

class DomaDatePicker extends React.Component {
  constructor(props) {
    super(props);
    const startDate = this.props.startDate ? moment(this.props.startDate) : moment();
    const customInputValue = this.props.startDate ? moment(this.props.startDate).format('MM.DD.YYYY') : moment().format('MM.DD.YYYY');
    this.state = {
      startDate: this.props.placeholderText ? null : startDate,
      customInputValue,
      isValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.startDate !== nextProps.startDate) {
      this.setState({
        startDate: moment(nextProps.startDate),
        customInputValue: moment(nextProps.startDate).format('MM.DD.YYYY'),
      });
    }
  }

  onClickOutside = () => {
    if (!this.state.isValid) {
      this.setState({
        isValid: true,
        customInputValue: this.state.startDate.format('MM.DD.YYYY'),
      });
    }
  }

  handleChange(date) {
    this.setState({
      customInputValue: date.format('MM.DD.YYYY'),
      isValid: true,
      startDate: date,
    });
    if (this.props.type) {
      this.props.onChange(date, this.props.type);
    } else {
      this.props.onChange(date.format(this.props.format || 'YYYY-MM-DD'), this.props.type);
    }
  }

  handleInputChange = (value, onChange) => {
    this.setState({ customInputValue: value });
    if (moment(value, 'MM.DD.YYYY', true).isValid()) {
      const start = new Date(this.props.minDate ? this.props.minDate.clone().subtract('1', 'days') : moment().subtract('10', 'years'));
      const end = new Date(this.props.maxDate ? this.props.maxDate.clone().add('1', 'days') : moment().add('10', 'years'));
      const date = new Date(moment(value));

      if (start < date && date < end) {
        onChange({ target: { value: moment(value).format('MM/DD/YYYY') } });
        this.setState({ isValid: true });
      } else {
        this.setState({ isValid: false });
      }
    } else {
      this.setState({ isValid: false });
    }
  }

  render() {
    return (
      <DatePicker
        customInput={
          <DomaDatePickerFormat
            placeholderText={this.props.placeholderText}
            classname={this.props.className}
            handleInputChange={this.handleInputChange}
            customInputValue={this.state.customInputValue}
            isValid={this.state.isValid}
          />
        }
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        showTimeSelect={this.props.showTimeSelect}
        selected={this.state.startDate}
        onChange={this.handleChange}
        onClickOutside={this.onClickOutside}
        preSelection={this.state.startDate}
      />
    );
  }
}

DomaDatePicker.propTypes = {
  onChange: PropTypes.func,
  startDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  format: PropTypes.string,
  placeholderText: PropTypes.string,
  className: PropTypes.string,
  showTimeSelect: PropTypes.bool,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  type: PropTypes.string,
};

export default DomaDatePicker;
