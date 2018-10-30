/**
*
* CheckboxCommon
* a stateless chechbox with smart componentShouldUpdate method
*/

import React from 'react'; 
 import PropTypes from 'prop-types'
// import styled from 'styled-components';
const icon = require('../../assets/images/newSVG/ic_done_white.svg');

import { FormattedMessage } from 'react-intl';
import { Col } from 'react-bootstrap';
import messages from './messages';
import styles from './checkboxCommon.scss';
import FieldRequired from '../FieldRequired';

class CheckboxCommon extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }
  toggle(e) {
    if (this.props.disabled === undefined || this.props.disabled === false) {
      const temp = {
        value: !this.props.value,
        text: this.props.text,
        identifier: this.props.identifier,
      }
      this.props.trigger(temp);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value === this.props.value) {
      return false;
    }
    //console.log(this.props.value, nextProps.value);
    return true;
  }
  componentWillUpdate() {
    //console.log(`checkbox updated ${this.props}`);
    //console.log(this.props);
  }
  render() {
    const ifDisabled = () => {
      if (this.props.disabled === true) {
        return styles.disabled;
      } return styles.enabled;
    };
    //console.log();
    return (
        <span onClick={this.toggle} className={`${styles.wrapper} ${ifDisabled()}`}>
          {!this.props.value &&
          <div className={`${styles.box} ${styles.unclicked}`}>
          </div>}
          {this.props.value &&
            <div className={`${styles.box} ${styles.clicked}`}>
              <img src={icon} className={styles.icon} />
            </div>}
          <span className={styles.text}>{this.props.text}</span>
          <FieldRequired required={this.props.required} />
        </span>
    );
  }
}

CheckboxCommon.propTypes = {
  text: PropTypes.string,
  trigger: PropTypes.func,
  identifier: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

export default CheckboxCommon;
