/**
*
* ControlBar
*
*/

import React from 'react';
// import styled from 'styled-components';
import { addCircleOutline } from 'react-icons/lib/md/add-circle-outline';
import { Col } from 'react-bootstrap';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './controlBar.scss';
import BarStyle from '../ControlBarStyle';

function ControlBar({ tabs, values, switchTab }) {
  return (
    <BarStyle>
      {tabs && tabs.map((tab, index) =>
      <Col key={index} lg={4} md={4} sm={4} xs={4}>
        {!values[tab] &&
          <span onClick={() => switchTab(tab)} className={styles.tab}>
            <FormattedMessage {...messages[tab]} />
          </span>
        }
        {values[tab] &&
          <span onClick={() => switchTab(tab)} className={`${styles.chosenTab} ${styles.tab}`}>
            <FormattedMessage {...messages[tab]} />
          </span>
        }
      </Col>)}
    </BarStyle>
  );
}

ControlBar.propTypes = {

};

export default ControlBar;
