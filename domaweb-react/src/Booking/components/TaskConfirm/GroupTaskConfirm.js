import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Modal,
  Button,
} from 'react-bootstrap';
import moment from 'moment';
import { ic_fiber_manual_record } from 'react-icons-kit/md/ic_fiber_manual_record';
import { arrowDownB } from 'react-icons-kit/ionicons/arrowDownB'
import Icon from 'react-icons-kit';
import EmployeeDropDown from './components/EmployeeDropDown';

import styles from './TaskConfirm-styles.scss';

class TaskConfirm extends PureComponent {
  renderArrow = () =>
    <Icon
      size={15}
      icon={arrowDownB}
    />

  render() {
    return (
      <Modal
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
        show={this.props.show}
        onHide={this.props.closeModal}
      >
        <Modal.Header closeButton className={styles.modal__header}>
          <Modal.Title className={styles.modal_title}>
            You`re now moving task from {this.props.groupItem.title} group!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.group_modal__content}>
          <div>
            <Row>
              <Col md={12}>
                <h5 className={styles.asking_label}> What you want to do with this task? </h5>
              </Col>
            </Row>
            <Row>
              <ul className={styles.group_items_list}>
                {this.props.relatedGroupItems.map((item, index) =>
                  <li key={index}>
                    <div className={styles.group_items_list_item}>
                      <Icon
                        size={15}
                        icon={ic_fiber_manual_record}
                        className={styles.list_bullet}
                      />
                      <div>
                        <span> {item.customerName} {moment(item.plannedStartTime).format('HH:mm')} - {moment(item.plannedEndTime).format('HH:mm')}</span>
                      </div>
                    </div>
                  </li>,
                )}
              </ul>
            </Row>
            <Row>
              <Col md={12}>
                <h5 className={styles.current_employee_label}> To employee <b>{this.props.employeeItem.title}</b></h5>
              </Col>
            </Row>
            <div className={styles.button_row}>
              <div className={styles.button_single_task}>
                <Button
                  type="submit"
                  className={`${styles.modal__btn} btn pull-right`}
                  onClick={this.props.moveSingleItem}
                >
                  Move a single task
                </Button>
              </div>
              <div className={styles.button_repeated_task}>
                <Button
                  type="submit"
                  className={`${styles.modal__btn} btn pull-right`}
                  disabled={this.props.draggedItem.repetitionId ? null : true}
                  onClick={this.props.moveRepeatedItem}
                >
                  Move all tasks from a group
                </Button>
              </div>
              <div className={styles.button_employee_dropdown}>
                <EmployeeDropDown
                  defaultvalue={this.props.employeeItem.title}
                  onchange={this.props.handleEmployeeDD}
                  options={this.props.employeeGroups}
                  renderArrow={this.renderArrow}
                />
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
  employeeItem: PropTypes.object,
  relatedGroupItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  employeeGroups: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
}

export default TaskConfirm;
