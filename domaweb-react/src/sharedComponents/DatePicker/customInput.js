import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { calendar } from 'react-icons-kit/fa/calendar';

import { displayDate } from '../../utils/dateUtil';

import styles from './customInput-styles.scss';

class CustomInput extends React.Component {

  render() {
    return (
      <div className={styles.example_custom_input} >
        <span className={styles.display_date}>{displayDate(this.props.value)}</span>
        <Icon icon={calendar} onClick={this.props.onClick} size={16}  />
      </div>
    );
  }
}

CustomInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};


export default CustomInput;
