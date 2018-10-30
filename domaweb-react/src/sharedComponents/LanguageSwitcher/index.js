/**
*
* SearchBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './LanguageSwitcher-styles.scss';

import {
  makeSelectLocale,
} from './../../LanguageProvider/selectors';

import {
  changeLocale,
} from './../../LanguageProvider/actions';

// Reference source for implementation: https://gist.github.com/krambertech/76afec49d7508e89e028fce14894724c

class LanguageSwitcher extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <select
        className={styles.LanguageSwitcher}
        value={this.props.locale}
        onChange={evt => this.props.changeLocale(evt.target.value)}
      >
        <option value="fi">Suomeksi</option>
        <option value="en">English</option>
      </select>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeLocale: locale => dispatch(changeLocale(locale)),
  };
}

LanguageSwitcher.propTypes = {
  locale: PropTypes.string,
  changeLocale: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);
