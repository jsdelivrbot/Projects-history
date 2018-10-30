/**
*
* Progress Button
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

import styles from './button-styles.scss';

const getBttnClass = (bttnStyle) => {
  if (bttnStyle === 'start' || bttnStyle === 'Start') {
    return styles.controls__bttn__start;
  } else if (bttnStyle === 'finish' || bttnStyle === 'Finish') {
    return styles.controls__bttn__finish;
  } else if (bttnStyle === 'hidden' || bttnStyle === 'Hidden') {
    return styles.controls__bttn__hide;
  } else if (bttnStyle === 'disabled' || bttnStyle === 'disabled') {
    return styles.controls__bttn__disabled;
  }
  return 'Wrong Status';
};

function Button(props) {
  return (
    <button className={`${styles.controls__bttn}  ${props.showLoading ? styles.controls_bttn_load : ''} ${props.type ? getBttnClass(props.type) : ''} ${props.className} `} style={props.styles || {}} onClick={props.clickHandler}>
      {props.text}
    </button>
  );
}

Button.propTypes = {
  clickHandler: PropTypes.func,
  /**
  * The text to show on the button. Expects String
  */
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Customoized the button styles by passing class names or styles. If you pass the
    buttn type as start, finish, hidden or disabled, it will use the default style. The
    default styles can be overwrite by passing custom styles.
  */
  className: PropTypes.string,
  styles: PropTypes.object,
  type: PropTypes.string,
  showLoading: PropTypes.bool,
};

export default Button;
