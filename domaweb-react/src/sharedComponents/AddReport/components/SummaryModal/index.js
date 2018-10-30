import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

import TextArea from '../TextArea';
import ReportSummary from '../ReportSummary';
//import styles from './custom-modal-styles.scss';


function SummaryModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body>
        <ReportSummary summary={props.summary}/>
      </Modal.Body>
    </Modal>
  );
  }


export default SummaryModal;
