import React from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-bootstrap';

import Spinner from '../../../sharedComponents/Spinner';
import TaskStartModal from '../TaskStartModal';
import TaskFinishModal from '../TaskFinishModal';
import AddReportModal from '../AddReportModal';
import ReportViewModal from '../../../sharedComponents/ReportDisplay/containers/ReportModal';
import AddTaskModal from '../../../sharedComponents/AddTaskModal';
import Counter from '../../../sharedComponents/Counter';
import { displayDate, getFormatedTime, getTimeDuration } from '../../../utils/dateUtil';


import messages from '../../messages';

import styles from './taskDetail-styles.scss';
import utilities from '../../../assets/styles/utilities.scss';

class TaskDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startModalOpen: false,
      finishModalOpen: false,
      reportViewOpen: false,
      addReportModalOpen: false,
      addCurrentTaskModal: false,
    };
  }
  addSuccessHandler = () => {
    console.log("time to redirect");
  }
  onOpenStartModal = () => {
    this.setState({ startModalOpen: true });
  };

  onCloseStartModal = () => {
    this.setState({ startModalOpen: false });
  };

  onStartConfirmation = (id) => {
    this.setState({ startModalOpen: false });
    this.props.startTask(id);
  };

  onOpenFinishModal = () => {
    this.setState({ finishModalOpen: true });
  };

  onCloseFinishModal = () => {
    this.setState({ finishModalOpen: false });
  };

  onFinishConfirmation = (id, dateObject) => {
    this.setState({ finishModalOpen: false });
    this.props.finishTask(id, dateObject);
  };

  toggleReportViewModal = () => {
    this.setState({ reportViewOpen: !this.state.reportViewOpen });
    this.props.hideOnPrint();
  }

  toggleAddReportModal = () => {
      this.setState({ addReportModalOpen: !this.state.addReportModalOpen });
  }

  toggleCurrentAddTaskModal = () => {
      this.setState({ addCurrentTaskModal: !this.state.addCurrentTaskModal });
  }

  estimateTime = (plannedStartTime, plannedEndTime, realizedStartTime) => {
    if (plannedStartTime && plannedEndTime) {
      const timeDuration = getTimeDuration(plannedStartTime, plannedEndTime);
      const duration = moment.duration({ minute: timeDuration });

      return moment(realizedStartTime).add(duration).format('HH:mm');
    }
    return -1;
  }

  getDetailBttnClass = (taskStatus) => {
    if (taskStatus === 'UNCONFIRMED') {
      return styles.play_bttn;
    } else if (taskStatus === 'CONFIRMED') {
      return styles.stop_bttn;
    }
    return utilities.display_none;
  }

  formatedDateTime = (task) => {
    const taskformated = {
      taskStartDate: '--',
      taskStartTime: '--',
      taskEndDate: '--',
      taskEndTime: '--',
      plannedStartDate: displayDate(task.plannedStartTime),
      plannedStartTime: getFormatedTime(task.plannedStartTime),
      plannedEndDate: displayDate(task.plannedEndTime),
      plannedEndTime: getFormatedTime(task.plannedEndTime),
    };

    if (task.itemState === 'FINISHED') {
      taskformated.taskStartDate = displayDate(task.realizedStartTime);
      taskformated.taskStartTime = getFormatedTime(task.realizedStartTime);

      taskformated.taskEndDate = displayDate(task.realizedEndTime);
      taskformated.taskEndTime = getFormatedTime(task.realizedEndTime);
    } else if (task.itemState === 'CONFIRMED') {
      taskformated.taskStartDate = displayDate(task.realizedStartTime);
      taskformated.taskStartTime = getFormatedTime(task.realizedStartTime);

      taskformated.taskEndDate = displayDate(task.realizedStartTime);
      taskformated.taskEndTime = this.estimateTime(task.plannedStartTime, task.plannedEndTime, task.realizedStartTime);
    }

    return taskformated;
  };

  render() {
    console.log('*-*-*-*-*-*-*-');
    console.log(this.props.showLoadingBttn);
    console.log(this.props.taskDetail.itemState);
    if (this.props.taskDetail !== undefined && this.props.taskDetail.id !== undefined && this.props.taskDetail.id == this.props.params.id) {
      const task = this.props.taskDetail;
      const dateTime = this.formatedDateTime(task);
      const taskDuartion = getTimeDuration(task.plannedStartTime, task.plannedEndTime);
      return (
        <Row className={utilities.overflow_hidden}>
          <Col xs={12} className={window.matchMedia('(max-width: 1200px)').matches ? styles.padding_increase : ' '}>
            { /* Task header*/}
            <Row className={utilities.overflow_hidden}>
              <Col xs={12} sm={12} className={styles.task_header}>
                <div className={styles.task_header__customer_info}>
                  <h1 className={styles.task_header__customer_info__name}>{task.customer.firstName} {task.customer.lastName}</h1>

                  <h3 className={styles.task_header__customer_info__number}>{task.customer.ssn}</h3>
                  { /*   <h3 className={styles.task_header__customer_info__group}>Nursing home A</h3>*/}

                  <div className={styles.task__detail__customer_status}>
                    <ul className={styles.padding_left_zero}>
                    { /*  <li className={task.customer.present ? styles.task__detail__customer_status__present : utilities.display_none}>Present</li>
                      <li className={task.customer.present ? utilities.display_none : styles.task__detail__customer_status__absent}>Absent</li>
                      <li className={task.customer.customerKeys.length !== 0 ? utilities.display_none : styles.task__detail__customer_status__keys}>Keys</li>*/}
                      <li className={styles.task__detail__customer_status__call}>
                          <a href={`tel:${task.customer.phoneNumber}`} className={styles.phone_number}>{task.customer.phoneNumber ? task.customer.phoneNumber : 'Not provided'}</a>
                      </li>
                    </ul>
                  </div>
                  { /* End of task__detail__customer_status div*/}
                </div>
                { /* End of customer info*/}

                <div className={styles.task_header__customer_pic}>
                  <img src={require('../../../assets/images/tasks/asiakkaan-kuva_harmaa.svg')} alt="Customer" className={styles.task_header__customer_pic__img} />
                </div>
                { /* End of customer picture*/}
              </Col>
            </Row>
            { /* End of task header*/}

            <div className={styles.customer_address}>
                <a href={`bingmaps:?cp= ${task.customer.streetAddress} ${task.customer.postalCode} ${task.customer.postOffice}`} className={styles.customer_address_link}>
                  <a href={`http://maps.apple.com/maps?q= ${task.customer.streetAddress} ${task.customer.postalCode} ${task.customer.postOffice}`} className={styles.customer_address_link}>
                   {task.customer.streetAddress} {task.customer.postalCode} {task.customer.postOffice}
                 </a>
                </a>
            </div>
            { /* End of customer address*/}

            <div className={styles.task_body}>
              <div className={styles.task_body_section}>

                <div className={utilities.overflow_hidden}>
                  <h3 className={styles.task_primary_heading}>
                    {task.itemState !== 'FINISHED' ? (task.itemState === 'CONFIRMED' ? (<FormattedMessage {...messages.taskStarted} />) : (<FormattedMessage {...messages.startTask} />)) : (<FormattedMessage {...messages.taskFinish} />)}
                  </h3>

                  <div className={styles.task_info__controls}>
                  {this.props.showLoadingBttn !== undefined && this.props.showLoadingBttn[0] && this.props.showLoadingBttn[1] === task.id ?
                    (<img className={styles.showLoading} src={require('../../../assets/images/tasks/Spinner.gif')}/>) :
                    (<button
                    className={`${styles.task_info__controls__bttn} ${this.getDetailBttnClass(task.itemState)}`}
                    onClick={task.itemState === 'UNCONFIRMED' ? this.onOpenStartModal : this.onOpenFinishModal}
                    />)
                  }

                  </div>
                  { /* End of info controls*/}

                  <div className={styles.task_info__assigne}>
                    <h4 className={styles.task_info__assigne__assigned_to}><FormattedMessage {...messages.assigned} /></h4>
                    <span>{task.employee.firstName} {task.employee.lastName}</span>
                  </div>
                  { /* End of task assigne*/}

                  <div className={utilities.clear_both}>
                    <p>{task.info}</p>
                  </div>
                </div>
                { /* End of task info div*/}

                <div className={utilities.overflow_hidden}>
                  <h3 className={styles.task_section_heading}>{<FormattedMessage {...messages.timeFrame} /> }</h3>
                  <div className={styles.task_time__box}>
                    <h4 className={`${styles.task_time_head} ${utilities.bold}`}><FormattedMessage {...messages.startTime} /></h4>
                    <div className={styles.task_time__start__date}>
                      <div>{dateTime.taskStartDate}</div>
                      <div>({dateTime.plannedStartDate})</div>
                    </div>
                    <div className={styles.task_time__start__time}>
                      <div>{dateTime.taskStartTime}</div>
                      <div>({dateTime.plannedStartTime})</div>
                    </div>
                  </div>

                  <div className={styles.task_time__box}>
                    <h4 className={`${styles.task_time_head} ${styles.highlighter} ${utilities.bold}`}>
                      {task.itemState !== 'FINISHED' ? (<FormattedMessage {...messages.estimatedTime} />) : (<FormattedMessage {...messages.completionTime} />)}
                    </h4>
                    <div className={styles.task_time__estimated__date}>
                      <div className={styles.highlighter}>{dateTime.taskEndDate}</div>
                      <div>({dateTime.plannedEndDate})</div>
                    </div>

                    <div className={styles.task_time__estimated__time}>
                      <div className={styles.highlighter}>{dateTime.taskEndTime}</div>
                      <div>({dateTime.plannedEndTime})</div>
                    </div>
                  </div>

                  <div className={styles.task_time__box}>
                    <h4 className={`${styles.task_time_head} ${utilities.bold}`}>{<FormattedMessage {...messages.duration} />}</h4>
                    <div>
                      <span className={styles.highlighter}>
                        {(task.itemState === 'CONFIRMED' ?
                        <Counter startMinutes={getTimeDuration(task.realizedStartTime, moment())} /> : '--')} / {taskDuartion} min
                      </span>
                    </div>
                  </div>

                  <div className={styles.task_time__box}>
                    <h4 className={`${styles.task_time_head} ${utilities.bold}`}>{<FormattedMessage {...messages.timeLeft} />}</h4>
                    <div>
                      <span className={styles.highlighter}>
                        {(task.itemState === 'CONFIRMED' ? <Counter reverse startMinutes={taskDuartion - getTimeDuration(task.realizedStartTime, moment())} /> : '--')} / {taskDuartion} min
                      </span>
                    </div>
                  </div>
                </div>
                { /* End of task time div*/}


                <div className={utilities.overflow_hidden}>
                  <h3 className={styles.task_section_heading}> {<FormattedMessage {...messages.services} />} {/*(2)*/}
                    {/*<span className={styles.plus_icon}>+</span>*/} </h3>
                  <div className={styles.section_box_left}>
                    {/*  Homecare*/}
                  </div>

                  <div className={`${utilities.text_align_right} ${styles.section_box_right}`}>
                    {/*<div className={styles.expand_icon}>
                      <span className={utilities.cursor_pointer}> Expand
                      <span className={styles.expand_icon_arrow}> &gt;&gt; </span> </span>
                    </div>*/}
                  </div>
                </div>
                { /* End of task service div*/}


                <div className={utilities.overflow_hidden}>
                  <h3 className={styles.task_section_heading}> {<FormattedMessage {...messages.additionalDetails} />}  </h3>
                  <div className={styles.section_box_left}>
                    {task.customer.addtionalInfo !== '' ? task.customer.addtionalInfo : '--'}
                  </div>

                  { /*<div className={styles.section_box_right}>
                    <div className={styles.edit_icon} />
                  </div>*/}
                </div>
                { /* End of task detail div*/}

                <div className={utilities.overflow_hidden}>

                  <h3 className={styles.task_section_heading}> {<FormattedMessage {...messages.otherConsideration} />}  </h3>

                  <div className={styles.section_box_left}>
                    {task.customer.otherConsideration !== '' ? task.customer.otherConsideration : '--'}
                  </div>

                { /*<div className={styles.section_box_right}>
                      <div className={styles.edit_icon} />
                  </div>
                </div>*/}

                </div>
                { /* End of task consideration div*/}


                <div className={utilities.overflow_hidden}>

                  <h3 className={styles.task_section_heading}> {<FormattedMessage {...messages.dailyReports} />}
                  {/* <span className={styles.plus_icon}>+</span>*/}
                  </h3>
                  <div className={styles.section_box_left}>
                      {/*Written Observation.*/}
                  </div>
                  <div className={styles.section_box_right}>
                    <div className={styles.edit_icon} />
                  </div>
                  {/*<div className={`${styles.expand_icon_margin} ${utilities.text_align_right} ${utilities.clear_both}`}>
                    <span className={utilities.cursor_pointer}>All reports
                      <span className={styles.expand_icon_arrow}> &gt;&gt;
                      </span>
                    </span>
                  </div>.*/}
                </div>
                { /* End of task daily reports div*/}
                { /*

                <div className={styles.tasks_physiology}>
                  <h3 className={styles.task_section_heading}> Physiology
                    <span className={styles.plus_icon}>+</span>
                  </h3>

                  <div className={styles.section_box_left}>
                      Blood pressure: 120/80
                  </div>

                  <div className={`${styles.section_box_right} ${utilities.text_align_right}`}>
                    <div className={styles.expand_icon_margin}>
                      <span className={utilities.cursor_pointer}> Expand
                         <span className={styles.expand_icon_arrow}> &gt;&gt;
                         </span>
                      </span>
                    </div>
                  </div>

                </div>*/}
                { /* End of physiology div*/}

              </div>
              { /* End of task body section div*/}

              <div className={styles.task_second_body_section}>
                { /*  <div className={styles.tasks_info}>
                  <h3 className={styles.task_section_heading}> Info <span className={styles.plus_icon}>+</span> </h3>
                  <div className={styles.task__info}>
                    <span className={styles.task__info__text}>{'Maito on Loppu'}</span>
                  </div>
                </div>*/}
                { /* End of task info div*/}
                { /* Start of second body section div*/}
                <div className={styles.tasks_dnr}>

                  <div className={styles.tasks_icons}>

                    <div className={styles.tasks_icons__list} style={{ width: '100%' }}>

                      <div className={`${styles.icon_list__box} ${styles.icon_list__daily_reports}`} onClick={this.toggleReportViewModal}>
                        <span className={styles.icon_list__box__text}>{<FormattedMessage {...messages.dailyReports} />}</span>
                      </div>

                      <div className={`${styles.icon_list__box} ${styles.icon_list__tasks}`} onClick={this.toggleCurrentAddTaskModal}>
                       <span className={styles.icon_list__box__text}>{<FormattedMessage {...messages.addTask} />}</span>
                     </div>

                    </div>
                  </div>
                </div>
                { /* End of second body section div*/}
              </div>
              { /* End of task body*/}
            </div>
            { /* End of left selected_task section */}

            <TaskStartModal
              open={this.state.startModalOpen}
              onCloseModal={() => this.onCloseStartModal()}
              onConfirmation={() => this.onStartConfirmation(task.id)}
              plannedStartTime={task.plannedStartTime}
              plannedEndTime={task.plannedEndTime}
              minWidth={window.matchMedia('(max-width: 499px)').matches ? 300 : 500}
            />

            <TaskFinishModal
              open={this.state.finishModalOpen}Inq
              onCloseModal={() => this.onCloseFinishModal()}
              onConfirmation={dateObject => this.onFinishConfirmation(task.id, dateObject)}
              task={task}
            />

            <ReportViewModal customerId={task.customerId} show={this.state.reportViewOpen} onClose={this.toggleReportViewModal} />

            <AddTaskModal
              show={this.state.addCurrentTaskModal}
              onClose={this.toggleCurrentAddTaskModal}
              startDate={this.props.params.date}
              endDate={this.props.params.date}
              customerId={task.customerId}
              employeeId={task.employeeId}
              customerName={`${task.customer.firstName} ${task.customer.lastName}`}
              phoneNum={task.customer.phoneNumber ? task.customer.phoneNumber : 'Not provided'}
              unitName={task.customer.ssn}
              addTaskSuccesshandler={this.props.loadTasks}
            />

          </Col>
        </Row>
      );
    }

    return (
      <Col xs={12}>
        <Spinner />
      </Col>
    );
  }
}

export default TaskDetail;

/*
<div className={styles.tasks_dnr}>

  <h3 className={styles.task_section_heading}> Do not resucitate (DNR) </h3>

  <div className={styles.section_box_left}>
    <div className={styles.dnr_icon}>DNR</div>
  </div>

  <div className={styles.section_box_right}>
    <div className={styles.edit_icon} />
  </div>

  <div className={`${styles.expand_icon} ${styles.expand_icon_margin} ${utilities.text_align_right} ${utilities.clear_both}`}>
    <span className={utilities.cursor_pointer}>Expand <span className={styles.expand_icon_arrow}> &gt;&gt; </span> </span>
  </div>

  <div className={styles.tasks_icons}>

    <div className={styles.tasks_icons__list} style={{ width: '100%' }}>

      <div className={`${styles.icon_list__box} ${styles.icon_list__tasks}`}>
        <span className={styles.icon_list__box__text}>Tasks</span>
      </div>

      <div className={`${styles.icon_list__box} ${styles.icon_list__cash_register}`}>
        <span className={styles.icon_list__box__text}>Cash register</span>
      </div>

      <div className={`${styles.icon_list__box} ${styles.icon_list__wallet}`}>
        <span className={styles.icon_list__box__text}> Wallet</span>
      </div>

      <div className={`${styles.icon_list__box} ${styles.icon_list__daily_reports}`}>
        <span className={styles.icon_list__box__text}>Daily Reports</span>
      </div>

      <div className={`${styles.icon_list__box} ${styles.icon_list__medication}`}>
        <span className={styles.icon_list__box__text}>Medication</span>
      </div>

      <div className={`${styles.icon_list__box} ${styles.icon_list__diagnoses}`}>
        <span className={styles.icon_list__box__text}> Diagnoses</span>
      </div>

      <div className={`${styles.icon_list__box} ${styles.icon_list__customer_files}`}>
        <span className={styles.icon_list__box__text}> Customer files</span>
      </div>

      <div className={`${styles.icon_list__box} ${styles.icon_list__documents}`}>
        <span className={styles.icon_list__box__text}> document</span>
      </div>

      <div className={`${styles.icon_list__box} ${styles.icon_list__images}`}>
        <span className={styles.icon_list__box__text}>images</span>
      </div>

      <div className={`${styles.icon_list__box} ${styles.icon_list__events}`}>
        <span className={styles.icon_list__box__text}> Events</span>
      </div>

      <div className={`${styles.icon_list__box} ${styles.icon_list__log}`}>
        <span className={styles.icon_list__box__text}> Assignation log</span>
      </div>

      <div className={`${styles.icon_list__box} ${styles.icon_list__key_log}`}>
        <span className={styles.icon_list__box__text}> Key log</span>
      </div>

    </div>

  </div>
</div>
*/
