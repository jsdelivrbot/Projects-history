/**
*
* InputWithImg
*
*/

import React from 'react';
 import PropTypes from 'prop-types';
// import styled from 'styled-components';
import styles from './inputWithImg.scss';
import FieldRequired from '../FieldRequired';
import calendarIcon from '../../assets/images/newSVG/sideNav/icon_calendar.svg';


class InputWithImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    //this.handleSinceChange = this.handleSinceChange.bind(this);
    //this.handleBeforeChange = this.handleBeforeChange.bind(this);
    this.onClick = this.props.onClick.bind(this);
  }
  render() {
    return (
      <div className={styles.box} onClick={this.props.onClick}>
        <img src={calendarIcon} className={styles.icon}/>
        <input className={styles.input} placeholder={JSON.stringify(this.props.displayDate)} />
      </div>
    );
  }
}

InputWithImg.propTypes = {
  onClick: PropTypes.func,
};

export default InputWithImg;
