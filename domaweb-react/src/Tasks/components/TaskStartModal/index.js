import Modal from 'react-responsive-modal';
import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-bootstrap';

import Button from '../../../sharedComponents/Button';

import { displayDate, currentDisplayDate, getFormatedTime, getformatedTimeDuration, startTime } from '../../../utils/dateUtil';

import messages from '../../messages';

import styles from './taskStartModal-styles.scss'
import utilities from '../../../assets/styles/utilities.scss';

class TaskStartModal extends React.PureComponent {

  render() {
    return (
      <Modal open={this.props.open} onClose={() => this.props.onCloseModal()}  closeIconSiz={64} modalStyle={{ padding: '0px', minWidth: this.props.minWidth }} closeIconClassName={styles.close_icon}>
        <div className={styles.modal_header}>
          <h2 className={styles.modal_heading}>{<FormattedMessage {...messages.startTask} />} </h2>
        </div>

        <div className={styles.task__info_top}>
          <span className={styles.task__info_top__text}>{<FormattedMessage {...messages.startTask} />}</span>
        </div>

        <div className={styles.modal_body}>

          <div>
            <h3 className={styles.task_section_heading}> {<FormattedMessage {...messages.currentTime} />}</h3>
            <div className={styles.section_box_left}>
              <table>
                <tbody>
                  <tr>
                    <td className={utilities.bold + ' ' + styles.task_time_table_column}> {<FormattedMessage {...messages.startTime} />} </td>
                    <td className={styles.task_time_table_column}>{currentDisplayDate()}</td>
                    <td className={styles.task_time_table_column}>{startTime()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className={styles.task_section_heading}> {<FormattedMessage {...messages.plannedTime} />} </h3>
            <div className={styles.section_box_left}>
              <table>
                <tbody>
                  <tr>
                    <td className={utilities.bold + ' ' + styles.task_time_table_column}>{<FormattedMessage {...messages.startTime} />}</td>
                    <td className={styles.task_time_table_column}>{displayDate(this.props.plannedStartTime)}</td>
                    <td className={styles.task_time_table_column}>{getFormatedTime(this.props.plannedStartTime)}</td>
                  </tr>
                  <tr>
                    <td className={utilities.bold + ' ' + styles.task_time_table_column}>{<FormattedMessage {...messages.endTime} />}</td>
                    <td className={styles.task_time_table_column}>{displayDate(this.props.plannedEndTime)}</td>
                    <td className={styles.task_time_table_column}>{getFormatedTime(this.props.plannedEndTime)}</td>
                  </tr>
                  <tr>
                    <td className={utilities.bold + ' ' + styles.task_time_table_column}>{<FormattedMessage {...messages.duration} />}</td>
                    <td className={styles.task_time_table_column}>{getformatedTimeDuration(this.props.plannedStartTime, this.props.plannedEndTime)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>


        <div className={`${utilities.overflow_hidden} ${styles.button_div}`}>

        <Button
          className={styles.cancel_button}
          text={<FormattedMessage {...messages.cancel} />}
          clickHandler={() => this.props.onCloseModal()}
        />

        <Button
          className={styles.confirm_button}
          text={<FormattedMessage {...messages.confirm} />}
          clickHandler={() => this.props.onConfirmation()}
        />
        </div>
      </div>
    </Modal>
    );
  }
}
// <button onClick={() => this.props.onCloseModal()} className={styles.cancel_button}>{<FormattedMessage {...messages.cancel} />}</button>
// <button onClick={() => this.props.onConfirmation()} className={styles.confirm_button}>{<FormattedMessage {...messages.confirm} />}</button>

export default TaskStartModal;
