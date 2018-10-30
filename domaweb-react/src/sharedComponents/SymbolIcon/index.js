/**
*
* SymbolIcon
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import DynamicImage from './../DynamicImage';

import styles from './SymbolIcon-styles.scss';

const SymbolIcon = (props) =>
  <DynamicImage
    imgName={props.icon}
    folder={'symbols'}
    className={styles.SymbolIcon}
    defaultImg={'info'}
    alt={props.icon}
  />;

SymbolIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default SymbolIcon;
