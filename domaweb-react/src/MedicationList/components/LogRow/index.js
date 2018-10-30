/**
*
* LogRow
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import styles from './logRow.scss'


const LogRow = ({ children, status }, { headerBlue, headerGreen }) =>
  status === 'CHECKED' ?
  <td style={{ borderLeft: `5px solid ${headerBlue}` }}>
    {children}
    <p className={styles.dispenserText}>Dispenser checked</p>
  </td> :
  <td style={{ borderLeft: `5px solid ${headerGreen}` }}>
  {children}
    <p className={styles.dispenserText}>Dispenser ready</p>
  </td>

LogRow.propTypes = {

};

LogRow.contextTypes = {
  headerGreen: PropTypes.string,
  headerBlue: PropTypes.string,
};

export default LogRow;
