import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

import Button from '../../../sharedComponents/Button';
import TaskStartModal from '../TaskStartModal';
import TaskFinishModal from '../TaskFinishModal';

import messages from '../../messages';

import styles from './task-styles.scss';
import utilites from '../../../assets/styles/utilities.scss';

class Task extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startModalOpen: false,
      finishModalOpen: false,
    };
  }

  onOpenStartModal = (event) => {
    event.stopPropagation();
    this.setState({ startModalOpen: true });
  };

  onCloseStartModal = () => {
    this.setState({ startModalOpen: false });
  };

  onStartConfirmation = (id) => {
    this.setState({ startModalOpen: false });
    this.props.startTask(id);
  };

  onOpenFinishModal = (event) => {
    event.stopPropagation();
    this.setState({ finishModalOpen: true });
  };

  onCloseFinishModal = () => {
    this.setState({ finishModalOpen: false });
  };

  onFinishConfirmation = (id, dateObject) => {
    this.setState({ finishModalOpen: false });
    this.props.finishTask(id, dateObject);
  };

  getTimeFormated = (startTime, endTime) => {
    const startMinutes = moment(startTime).format('HH:mm');
    const endMinutes = moment(endTime).format('HH:mm');
    return `${startMinutes}-${endMinutes}`;
  }

  render() {
    const task = this.props.task;
    const routeTaskId = this.props.router.params.id;
    const taskStatusStyles = task.itemState === 'FINISHED' ? styles.task__status_bar__done : (task.itemState === 'CONFIRMED' ? styles.task__status_bar__attention : styles.task__status_bar__late);
    return (
      <Row className={`${styles.task} ${utilites.overflow_hidden} ${routeTaskId && routeTaskId == task.id ? styles.task_is_active : ''}`} onClick={() => this.props.changeRoute(task.id)}>
        <Col xs={12} className={utilites.padding_left_zero}>
          <div className={`${styles.task__status_bar} ${taskStatusStyles}`} />
          <div className={styles.task__body}>
            <div className={task.itemState === 'FINISHED' ? styles.task__detail__done : styles.task__detail}>
              <div className={styles.task__detail__customer_info} >
                <h3 className={styles.task__detail__customer_info__name}>
                  {task.customer.firstName} {task.customer.lastName}
                </h3>
                <h3 className={task.itemState === 'FINISHED' ? utilites.display_none : styles.task__detail__customer_info__address}>
                  {task.customer.streetAddress} {task.customer.postalCode} {task.customer.postOffice}
                </h3>
              </div>
              { /* End of task__detail__customer-info div */}
              <div className={task.itemState === 'FINISHED' ? utilites.display_none : styles.task__detail__customer_status}>
                <ul>
                { /*  <li className={task.customer.present ? styles.task__detail__customer_status__present : utilites.display_none}>Present</li>
                  <li className={task.customer.present ? utilites.display_none : styles.task__detail__customer_status__absent}>Absent</li>
                  <li className={task.customer.customerKeys.length !== 0 ? utilites.display_none : styles.task__detail__customer_status__keys}>Keys</li>*/}
                  <li className={styles.task__detail__customer_status__call}>
                    <a href={`tel:${task.customer.phoneNumber}`} className={styles.phone_number}>{task.customer.phoneNumber ? task.customer.phoneNumber : 'Not provided'}</a>
                  </li>
                </ul>
              </div>
              { /* End of task__detail__customer-status div */ }
            </div>
            { /* End of task__detail div */ }
            <div className={styles.task__controls}>
              <div className={styles.task__controls__bttns}>
                <Button
                  text={task.itemState === 'UNCONFIRMED' ? (<FormattedMessage {...messages.startTasks} />) : (<FormattedMessage {...messages.finishTasks} />)}
                  type={task.itemState === 'UNCONFIRMED' ? 'Start' : (task.itemState === 'CONFIRMED' ? 'Finish' : 'Hidden')}
                  clickHandler={task.itemState === 'UNCONFIRMED' ? this.onOpenStartModal : this.onOpenFinishModal}
                  showLoading={this.props.showLoadingBttn !== undefined && this.props.showLoadingBttn[1] === task.id ? this.props.showLoadingBttn[0] : false}
                />
              </div>
              <div className={task.itemState === 'FINISHED' ? styles.task__controls__time__done : styles.task__controls__time}>{this.getTimeFormated(task.plannedStartTime, task.plannedEndTime)}</div>
              <div className={task.itemState === 'FINISHED' ? styles.task__controls__information__done : styles.task__controls__information}>
                <span>{task.info}</span>
              </div>
            </div>
          </div>
          <TaskStartModal
            open={this.state.startModalOpen}
            onCloseModal={() => this.onCloseStartModal()}
            onConfirmation={() => this.onStartConfirmation(task.id)}
            plannedStartTime={task.plannedStartTime}
            plannedEndTime={task.plannedEndTime}
          />
          <TaskFinishModal
            open={this.state.finishModalOpen}
            onCloseModal={() => this.onCloseFinishModal()}
            onConfirmation={dates => this.onFinishConfirmation(task.id, dates)}
            task={task}
          />
        </Col>
      </Row>
    );
  }
}

Task.propTypes = {
//  task: PropTypes.array.isRequired,
  changeRoute: PropTypes.func.isRequired,
};

export default Task;
