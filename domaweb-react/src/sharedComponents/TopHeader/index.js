import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl';

import LanguageSwitcher from './../LanguageSwitcher';
import styles from './topheader-styles.scss';

import messages from './messages';

class TopHeader extends React.Component {

  /* Function to extract / from some component names passed
     and returned the string to set appropriate background styles*/
  extractState = (state) => {
    const subStr = state.replace('/', ''); // remove intial / from componenet name
    return `${subStr.substring(0, (subStr.indexOf('/') === -1 ? subStr.length : subStr.indexOf('/')))}_background`;
  }

  /* Function to extract / from some component names passed
     and returned the string firts letter in uppercase*/
  toUpperCase = (state) => {
    const subStr = state.replace('/', '');
    //const subStr = state.replace('/', '').replace(/\b[a-z]/g, f => f.toUpperCase());
    return `${subStr.substring(0, (subStr.indexOf('/') === -1 ? subStr.length : subStr.indexOf('/')))}`;
  }

  render() {
    const state = this.toUpperCase(this.props.component);
    return (
      <div className={`${styles.top_header} ${styles[this.extractState(this.props.component)]}`}>
        <span> {state == 'tasks' || state== 'customer' ? (<FormattedMessage {...messages[state]} />) : state} </span>
        <div className={styles.language_switcher}>
          <LanguageSwitcher />
        </div>
      </div>
    );
  }
}

TopHeader.propTypes = {
  component: PropTypes.string.isRequired,
};

export default TopHeader;
