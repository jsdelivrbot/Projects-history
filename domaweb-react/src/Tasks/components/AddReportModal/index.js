import Modal from 'react-responsive-modal';
import React from 'react';

import AddReport from '../../../sharedComponents/AddReport';

import styles from './add-report-modal-styles.scss'
import utilities from '../../../assets/styles/utilities.scss';

class AddReportModal extends React.PureComponent {

  render() {
      return (
        <Modal open={this.props.open} onClose={() => this.props.onClose()}  closeIconSiz={64} modalStyle={{ padding: '0px' }} closeIconClassName={styles.close_icon} bsSize="large">
          <div className={styles.modal_header}>
            <h2 className={styles.modal_heading}>Add Report </h2>
          </div>
          <div className={styles.modal_body}>
            <AddReport taskId={this.props.taskId} customerId={this.props.customerId} />
          <div className={`${utilities.overflow_hidden} ${styles.button_div}`}>
            <button onClick={() => this.props.onClose()} className={styles.cancel_button}>Cancel</button>
            <button onClick={() => this.props.onConfirmation()} className={styles.confirm_button}>Confirm</button>
          </div>
        </div>
      </Modal>
      );
  }
}

export default AddReportModal;
