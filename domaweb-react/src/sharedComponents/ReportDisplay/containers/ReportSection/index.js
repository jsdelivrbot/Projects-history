/**
*
* ReportModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import ReportDisplay from './../ReportDisplay';

import styles from './ReportSection-styles.scss';

class ReportSection extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h1>Raportit</h1>
        <ReportDisplay customerId={this.props.customerId} useWindow />
      </div>
    );
  }
}

ReportSection.propTypes = {
  customerId: PropTypes.number.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(null, mapDispatchToProps)(ReportSection);
