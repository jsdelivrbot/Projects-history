import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Modal,
  Button,
} from 'react-bootstrap';

import styles from './TaskConfirm-styles.scss';

class TaskConfirm extends PureComponent {
  render() {
    return (
      <Modal
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
        show={this.props.show}
        // draggedItem={this.props.draggedItem}
        onHide={this.props.closeModal}
      >
        <Modal.Header closeButton className={styles.modal__header}>
          <Modal.Title className={styles.modal_title}>
            Task ID: {this.props.draggedItem.taskId}?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal__content}>
          <div>
            <Row>
              <Col md={12}>
                <h5 className={styles.asking_label}> What you want to do with this task? </h5>
              </Col>
            </Row>
            <div className={styles.button_row}>
              <div className={styles.button_single_task}>
                <Button
                  type="submit"
                  className={`${styles.modal__btn} btn pull-right`}
                  onClick={this.props.moveSingleItem}
                >
                  Update a single task
                </Button>
              </div>
              <div className={styles.button_repeated_task}>
                <Button
                  type="submit"
                  className={`${styles.modal__btn} btn pull-right`}
                  disabled={this.props.draggedItem.repetitionId ? null : true}
                  onClick={this.props.moveRepeatedItem}
                >
                  Update repeated tasks
                </Button>
              </div>
              <div className={styles.button_cancel_move}>
                <button
                  type="submit"
                  className={`${styles.modal__btn} btn pull-right`}
                  onClick={this.props.closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

TaskConfirm.PropTyes = {
  moveItemPayload: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  moveRepeatedItem: PropTypes.func.isRequired,
  moveSingleItem: PropTypes.func.isRequired,
  draggedItem: PropTypes.object.isRequired,
}
export default TaskConfirm;
