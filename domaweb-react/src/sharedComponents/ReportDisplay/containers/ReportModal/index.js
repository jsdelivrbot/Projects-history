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

import {
  onReportDisplayClosed,
} from './../ReportDisplay/actions';

import ReportDisplay from './../ReportDisplay';

import styles from './ReportModal-styles.scss';

class ReportModal extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  closeReportModal = () => {
    this.props.onClose();
    this.props.closeReportModal();
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.closeReportModal}
        dialogClassName={styles.ReportModal}
      >
        <Modal.Header closeButton className={styles.ReportModal__Header}>
          <FormattedMessage {...messages.header} />
        </Modal.Header>
        <Modal.Body className={styles.ReportModal__Body}>
          <ReportDisplay customerId={this.props.customerId} />
        </Modal.Body>
      </Modal>
    );
  }
}

ReportModal.propTypes = {
  customerId: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  closeReportModal: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    closeReportModal: () => dispatch(onReportDisplayClosed()),
  };
}

export default connect(null, mapDispatchToProps)(ReportModal);
