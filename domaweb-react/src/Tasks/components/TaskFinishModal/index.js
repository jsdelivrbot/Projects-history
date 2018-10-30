import Modal from 'react-responsive-modal';
import React from 'react';
import moment from 'moment';
import { Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Icon from 'react-icons-kit';
import { ic_access_time } from 'react-icons-kit/md/ic_access_time';
import { ic_delete_forever } from 'react-icons-kit/md/ic_delete_forever';
import { edit } from 'react-icons-kit/ionicons/edit';

import AddReportModal from '../AddReportModal';

import TimePicker from '../../../sharedComponents/DomaTimePicker';
import DatePicker from '../../../sharedComponents/DomaDatePicker';
import { displayDate, getFormatedDate, startDate, startTime, getFormatedTime, getformatedTimeDuration, getTimeForDatabase, convertTimeForDatabase } from '../../../utils/dateUtil';

// import TimePicker from '../../../SharedComponents/TimePicker';
import messages from '../../messages';

import styles from './taskFinishModal-styles.scss'
import utilities from '../../../assets/styles/utilities.scss';

class TaskFinishModal extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      dateFrom: getFormatedDate(this.props.task.plannedStartTime),
      dateTo: getFormatedDate(this.props.task.plannedEndTime),
      timeFrom: getFormatedTime(this.props.task.plannedStartTime),
      timeTo: getFormatedTime(this.props.task.plannedEndTime),
      timeDurationFrom: this.props.task.plannedStartTime,
      timeDurationTo: this.props.task.plannedEndTime,
      addReportModalOpen: false,
    };
  }

  onDateFromChange = (date) => {
    this.state.dateFrom = date;
    this.setState({timeDurationFrom : this.getSelectedDate()});
  }

  onDateToChange = (date) => {
    this.state.dateTo = date;
    this.setState({timeDurationTo : this.getSelectedTime()});
  }

  onTimeFromChange = (time) => {
    this.state.timeFrom = time;
    this.setState({timeDurationFrom : this.getSelectedDate()});
  }

  onTimeToChange = (time) => {
    this.state.timeTo = time;
    this.setState({timeDurationTo : this.getSelectedTime()});
  }


  formatedDateTime = (task) => {
    const taskformated = {
      plannedStartDate: displayDate(task.plannedStartTime),
      plannedStartTime: getFormatedTime(task.plannedStartTime),
      plannedEndDate: displayDate(task.plannedEndTime),
      plannedEndTime: getFormatedTime(task.plannedEndTime),
    };
    return taskformated;
  }

  getSelectedDate = () =>
     convertTimeForDatabase(`${this.state.dateFrom} ${this.state.timeFrom}`);

  getSelectedTime = () =>
     convertTimeForDatabase(`${this.state.dateTo} ${this.state.timeTo}`);

  getSelectedTimeFrame = () => {
    const taskDateFrom = convertTimeForDatabase(`${this.state.dateFrom} ${this.state.timeFrom}`);
    const taskDateTo = convertTimeForDatabase(`${this.state.dateTo} ${this.state.timeTo}`);
    return {
      realizedStartTime: taskDateFrom,
      realizedEndTime: taskDateTo,
    }
  }

  toggleAddReportModal = () => {
      this.setState({ addReportModalOpen: !this.state.addReportModalOpen });
  }

  renderContent = () => {
    const task = this.props.task;
    const dateTime = this.formatedDateTime(task);
    return (
      <Modal open={this.props.open} onClose={() => this.props.onCloseModal()} modalStyle={{ padding: '0px', width: '100%' }} closeIconClassName={styles.close_icon}>

        <div className={styles.modal_header}>
          <h2 className={styles.modal_heading}>{<FormattedMessage {...messages.endTask} />}</h2>
        </div>

        <div className={styles.task__info_top}>
            <span className={styles.task__info_top__text}>{<FormattedMessage {...messages.finishConfirmation} />}</span>
        </div>

        <div className={styles.modal_body}>

          <div className={styles.customor_info}>
            <h1 className={styles.customer_info__name}>{task.customer.firstName} {task.customer.lastName}</h1>
            <h3 className={styles.customer_info__number}>{task.customer.ssn}</h3>
            {/*<h3 className={styles.customer_info__group}>Nursing home A</h3>*/}
          </div>

          <div>
            <h3 className={styles.task_section_heading}> {<FormattedMessage {...messages.plannedTime} />} </h3>
            <div className={styles.section_box_left}>
              <table>
                <tbody>
                  <tr>
                    <td className={utilities.bold + ' ' + styles.task_time_table_column}> {<FormattedMessage {...messages.startTime} />} </td>
                    <td className={styles.task_time_table_column}>{dateTime.plannedStartDate}</td>
                    <td className={styles.task_time_table_column}>{dateTime.plannedStartTime}</td>
                  </tr>
                  <tr>
                    <td className={utilities.bold + ' ' + styles.task_time_table_column}> {<FormattedMessage {...messages.endTime} />} </td>
                    <td className={styles.task_time_table_column}>{dateTime.plannedEndDate}</td>
                    <td className={styles.task_time_table_column}>{dateTime.plannedEndTime}</td>
                  </tr>
                  <tr>
                    <td className={utilities.bold + ' ' + styles.task_time_table_column}>{<FormattedMessage {...messages.duration} />}</td>
                    <td className={styles.task_time_table_column}>{getformatedTimeDuration(task.plannedStartTime, task.plannedEndTime)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>


            <h3 className={styles.task_section_heading}>{<FormattedMessage {...messages.timeFrame} />} </h3>

            <div className={styles.section_box_left}>

              <div className={styles.date_section}>
                <div className={styles.date_section_heading}>
                  <span className={utilities.bold}>{<FormattedMessage {...messages.startTime} />}</span>
                </div>
                <div className={styles.date_section_datetime}>
                  <div className={styles.date_section_date}>
                    <DatePicker onChange={date => this.onDateFromChange(date)} startDate={getFormatedDate(task.plannedStartTime)} />
                  </div>
                  <div className={styles.date_section_time}>
                    <TimePicker defaultValue={moment(task.plannedStartTime)} onChange={value => this.onTimeFromChange(value)} format={'HH:mm'} />
                  </div>
                </div>
              </div>

              <div className={styles.date_section}>
                <div className={styles.date_section_heading}>
                  <span className={utilities.bold}>{<FormattedMessage {...messages.endTime} />}</span>
                </div>
                <div className={styles.date_section_datetime}>
                  <div className={styles.date_section_date}>
                    <DatePicker onChange={date => this.onDateToChange(date)} startDate={moment(task.plannedEndTime)} />
                  </div>
                  <div className={styles.date_section_time}>
                    <TimePicker defaultValue={moment(task.plannedEndTime)} onChange={value => this.onTimeToChange(value)} format={'HH:mm'} />
                  </div>
                </div>
              </div>


              <div className={styles.duration_section}>
                <div className={styles.duration_section_heading}>
                  <span className={utilities.bold}>{<FormattedMessage {...messages.duration} />}</span>
                </div>
                <div className={styles.duration_section_time}>
                  {getformatedTimeDuration(this.state.timeDurationFrom, this.state.timeDurationTo)}
                </div>
              </div>

            </div>
          </div>

        {/*  <div className={utilities.overflow_hidden + ' ' + utilities.clear_both} >
            <h3 className={styles.task_section_heading}> Services
              <span className={styles.plus_icon}>+</span>
            </h3>
            <div className={styles.section_box_left}>
                Services
            </div>
          </div>*/}

          <div className={utilities.overflow_hidden}>
            {/*  <h3 className={styles.task_section_heading}> Daily report
              <span className={styles.plus_icon}>+</span>
            </h3>*/}
            <div className={styles.section_box_left}>

              <div className={styles.type}>
                  {/*<div className={styles.type_header}>
                  <div>
                    <h3 className={`${styles.type_header_heading} ${utilities.bold}`}>{<FormattedMessage {...messages.dailyReports} />}</h3>
                  </div>
                </div>
                <div className={styles.type_body}>
                <div className={styles.home_visit}>
                    Home Visit
                  </div>
                  <div className={styles.dictate_report}>
                    Dictate Report
                  </div>
                  <div className={styles.add_symbol_report}>
                  {<FormattedMessage {...messages.addSymbolReport} />}
                  </div>
                </div>*/}
              </div>

              {/* <div className={styles.type}>
                <div className={styles.type_header}>
                  <div className={styles.type_header_heading}>
                    <h3 className={`${styles.type_header_heading} ${utilities.bold}`}>Symbol report</h3>
                  </div>
                </div>
                <div className={styles.type_body + ' ' + styles.symbol_body}>
                <div className={styles.symbol_name}>
                    <span> Symbol name </span>
                  </div>
                  <div className={styles.symbol_option}>
                    <span> Option level 2: Option level 3</span>
                  </div>
                  <div className={styles.symbol_edit}>
                    <span> Edit <Icon icon={edit} size={22} className={`${utilities.display_inline_block} ${styles.edit_icon}`}/> </span>
                  </div>
                  <div className={styles.symbol_remove}>
                    <span> Remove <Icon icon={ic_delete_forever} size={24} className={`${utilities.display_inline_block} ${styles.delete_icon}`} /> </span>
                  </div>
                </div>
              </div>*/}

            {/*   <div className={styles.type}>
                <div className={styles.type_header}>
                  <div>
                    <h3 className={`${styles.type_header_heading} ${utilities.bold}`}>Free text report</h3>
                  </div>
                </div>
                <div className={styles.type_header_body}>
                  <textarea className={styles.free_text_report}></textarea>
                </div>
              </div>*/}

            </div>
          </div>

            {/*<div className={styles.tasks_info}>
            <h3 className={styles.task_section_heading}> Reminder
              <span className={styles.plus_icon}>+</span> </h3>
            <div className={styles.task__info}>
              <span className={styles.task__info__text}>{"Maito on Loppu"}</span>
            </div>
          </div>*/}

          <div className={`${utilities.overflow_hidden} ${styles.button_div}`}>
            <button onClick={() => this.props.onCloseModal()} className={styles.cancel_button}>  {<FormattedMessage {...messages.cancel} />}</button>
            <button onClick={() => {this.props.onConfirmation(this.getSelectedTimeFrame()); }} className={styles.confirm_button}>  {<FormattedMessage {...messages.confirm} />}</button>
          </div>
        </div>

    {  /* <AddReportModal
          open={this.state.addReportModalOpen}
          onClose={this.toggleAddReportModal}
          customerId={task.customerId}
          taskId={task.id}
          /> */}

      </Modal>
    );
  }

  render() {
    return this.props.task ? this.renderContent() : ' ';
  }
}

export default TaskFinishModal;
