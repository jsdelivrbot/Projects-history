import React from 'react';
import PropTypes from 'prop-types';

import styles from './controlBarStyle.scss';

const BarStyle = ({ children, customStyles }) =>
customStyles
  ? <div className={styles.controlBar} style={customStyles}>{children}</div>
  : <div className={styles.controlBar}>{children}</div> 

export default BarStyle;