

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import Icon from 'react-icons-kit';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/lib/md'
import styles from './radioButtonStyles.scss';

const defaultStyles = {
  uncheckedColor: '#4D4D4D ',
  checkedColor: '#7AB600 '
}

const RadioButton = ({ parentValue, value, onChange, text, index, color, size }) => {
  return (
    <span className={styles.radioButton} onClick={() => onChange(value)}>
      { parentValue === value
        ?
          <MdRadioButtonChecked color={'#7AB600'} size={size} />
        :
          <MdRadioButtonUnchecked color={'#4D4D4D'} size={size} />
      }
      {text}
    </span>
  );
};

export default RadioButton;