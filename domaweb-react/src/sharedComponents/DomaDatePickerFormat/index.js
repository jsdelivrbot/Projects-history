import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { calendar } from 'react-icons-kit/fa/calendar';

import styles from './DomaDatePickerFormat-styles.scss';

class DomaDatePickerFormat extends React.Component {
  render() {
    return (
      <div
        className={
          (this.props.classname ?
          `${styles.example_custom_input} ${this.props.classname} ${!this.props.isValid ? styles.invalid_input : ''}` :
          styles.example_custom_input) +
          (this.props.disabled ? ` ${styles.datepicker__disabled}` : '') +
          (!this.props.isValid ? ` ${styles.invalid_input}` : '')
        }
        onClick={this.props.onClick}
      >
        <input
          name="checkDate"
          type="text"
          value={this.props.customInputValue}
          onChange={e => this.props.handleInputChange(e.target.value, this.props.onChange)}
        />
        <span>
          <Icon icon={calendar} size={16} className={styles.datepicker__icon} />
        </span>
      </div>
    );
  }
}

DomaDatePickerFormat.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  placeholderText: PropTypes.string,
  classname: PropTypes.string,
  disabled: PropTypes.bool,
  handleInputChange: PropTypes.func,
  isValid: PropTypes.bool,
};

export default DomaDatePickerFormat;
