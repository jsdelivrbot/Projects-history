/**
*
* Sidenav Component
*
*/

import React from 'react';

import moment from 'moment';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import AuthRequired from '../sharedComponents/AuthRequired';

import { loadUserTasks, tasksLoaded, loadUserTaskDetail, taskDetailLoaded, startTask, taskStarted, finishTask, taskFinished } from './actions';
import { getTasksList, getTaskDetail, getshowLoadingBttn } from './selectors';

import Spinner from '../sharedComponents/Spinner';
import TasksDateSelectorBar from './components/TasksDateSelectorBar';
import TasksList from './components/TasksList';
import { urlDate, getTimeForDatabase } from '../utils/dateUtil';

import utilites from '../assets/styles/utilities.scss';
import styles from './tasks-styles.scss';

class Tasks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      taskListOpen: true, // to close and open task detail section
      taskDetailOpen: false, // to close and open task detail section
      idOfOpentasks: 0, // To stop sending request if the task id is same
      hideOnPrint: false, // To hide all the task view on print mode when necessary
    };
    sessionStorage.setItem('previousDate', this.props.params.date);
  }

  componentWillMount() {
    console.log('Component will mount wokring');
    this.loadTasks(this.props.params.date); // Load the task list before mountng the component
    this.checkRouteForDetail(); // Whenever new props is received check if the task id is present in the current state is task, then close the task detail section otherwise open
  }

  componentWillReceiveProps(nextProps) {
    console.log('Component will recive props wokring');
    // Whenever new props is received check if the task id is present in the
    // current state is task, then close the task detail section otherwise open
    this.checkRouteForDetail();
    // if the route is taskdetail set the id and dispatch the task detail request
    this.setState(
      {
        idOfOpentasks: this.props.params.id,
      });

    if (Array.isArray(this.props.tasksList) && nextProps.params.date !== sessionStorage.getItem('previousDate')) {
      console.log("****Reuqesting****");
  //    console.log('Request Date ' + nextProps.params.date);
      sessionStorage.setItem('previousDate', nextProps.params.date);
      this.loadTasks(nextProps.params.date);
      this.setState({
        taskListOpen: false,
      });
    }

    // If the id of tasks is passed in and the ID of open task is not the same aa it is, fecthed task detail
    this.props.params.id && this.props.params.id !== this.state.idOfOpentasks ? this.loadTaskDetail(this.props.params.id) : '';

    // If the route is task detail and the screen resolution is less than 1280px, hide the task list
    if (window.matchMedia('(max-width: 1200px)').matches && this.props.params.id) {
      this.setState({
        taskListOpen: false,
      });
    }
  }

 /* Function to dispatch load user task action*/
  loadTasks(date) {
    this.props.loadUserTasks(date);
  }

 /* Function to dispatch load task detail action*/
  loadTaskDetail(id) {
    this.props.loadUserTaskDetail(id);
  }

  /* Function to dispatch start task action*/
  startUserTask(id) {
    // Create the payload object
    const data = {
      itemState: 'CONFIRMED',
      realizedStartTime: getTimeForDatabase(),
    };
    const date = urlDate(this.props.params.date); // get the date for reloading the task
    this.props.startTask(id, date, data); // Dispatch the create Task action
  }

  /* Function to dispatch Finish task action*/
  finishUserTask(id, dateObject) {
    // For stopping the event propagation
    const data = {
      itemState: 'FINISHED',
      realizedStartTime: dateObject.realizedStartTime,
      realizedEndTime: dateObject.realizedEndTime,
    };
    const date = urlDate(this.props.params.date); // get the date for reloading the task
    this.props.finishTask(id, date, data);
  }

// This checks wether the current state is task or task detail
  checkRouteForDetail() {
    const currentRoute = this.props.routes[this.props.routes.length - 1];
    if (currentRoute.name === 'tasks') {
      this.setState({
        taskDetailOpen: false,
      });
    } else {
      this.setState({
        taskDetailOpen: true,
      });
    }
  }

/* Function used to opne task detail when user click on any task*/
  openTaskDetail = () => {

    if(window.matchMedia('(max-width: 1200px)').matches){
      this.setState({
        taskDetailOpen: true,
      });
    }
    else {
      this.setState({
        taskListOpen: true,
        taskDetailOpen: true,
      });
    }
  };

  afterFinishTask = () =>{
      this.loadTasks(this.props.params.date);
  }

/* Formates, changes the date in URL based on given date and dispatch the request for tasks list for that day*/
  changeDate = (date) => {
    const formatedDate = urlDate(date); //Format Date to the URL format
    this.props.router.push(`/tasks/${formatedDate}`); //push the new date in the URL
  //  this.loadTasks(formatedDate); // Dispacth the tasks list of that day
  }

/* Increase the date by one day*/
  tomorrow = () => {
    const day = moment(this.props.params.date).add(1, 'd').toDate(); //Add the date in the current date in URL
    this.changeDate(day); // Change view based on selected date
  }

/* deccrease the date by one day*/
  yesterday = () => {
    const day = moment(this.props.params.date).subtract(1, 'd').toDate(); //Subtract the date in the current date in URL
    this.changeDate(day); // Change view based on selected date
  }

  checkResolution = () => {
    return window.matchMedia('(max-width: 1200px)').matches ? (this.state.taskDetailOpen  ? this.setState({taskListOpen: false}) : '' ) : this.setState({taskListOpen: true});
  }

  toggleHideOnPrint = (bool) => {
    this.setState({
      hideOnPrint: !this.state.hideOnPrint,
    });
  }

  render() {
    window.addEventListener('resize', this.checkResolution);

    // if (Array.isArray(this.props.tasksList) && sessionStorage.getItem('previousDate') === this.props.params.date) {
    if (Array.isArray(this.props.tasksList) && (this.props.tasksList.length !==0 ? urlDate(this.props.tasksList[0].plannedStartTime) === this.props.params.date : true)) {
    // if (this.props.tasksList !== undefined && Array.isArray(this.props.tasksList)) {
     console.log('In if');
      return (
        // <div className={this.state.hideOnPrint ? styles.Tasks_NoPrint : ''}>
        <div className={this.state.hideOnPrint ? styles.TaskWrapper_PrintHidden : ''}>
          <Col xs={12} className={`${styles.tasks_main} ${utilites.padding_zero}`}>
            <TasksDateSelectorBar
              tomorrowDate={this.tomorrow}
              yesterdayDate={this.yesterday}
              changeDate={this.changeDate}
              currentDate={this.props.params.date}
              router={this.props.router}
            />
          </Col>
          <Col xs={12} className={utilites.padding_left_zero}>
            <Row className={utilites.overflow_hidden}>
              <Col
                xs={12}
                sm={12}
                lg={6}
                className={`${styles.min_height} ${this.state.taskDetailOpen && this.props.params.id ? (this.state.taskListOpen ? utilites.width_50_per : utilites.display_none ) : utilites.width_100_per} ${utilites.padding_right_zero}`}
                onClick={this.openTaskDetail}
              >
                <TasksList
                  tasks={this.props.tasksList}
                  startTask={id => this.startUserTask(id)}
                  finishTask={(id, dateObject) => this.finishUserTask(id, dateObject)}
                  loadTasks={this.afterFinishTask}
                  userDetail={this.props.AuthRequired.userInfo.currentDomacareUser}
                  openTaskDetail={() => this.openTaskDetail()}
                  showLoadingBttn={this.props.showLoadingBttn}
                />
              </Col>
              <Col xs={12} sm={12} lg={6} className={this.state.taskDetailOpen ? styles.taskDetailDiv : utilites.display_none} >
                {
                  React.Children.map(
                    this.props.children,
                     child => React.cloneElement(child,
                       {
                          taskDetail: this.props.taskDetail,
                          startTask: id => this.startUserTask(id),
                          finishTask: (id, dateObject) => this.finishUserTask(id, dateObject),
                          loadTasks: this.afterFinishTask,
                          userDetail: this.props.AuthRequired.userInfo.currentDomacareUser,
                          hideOnPrint: this.toggleHideOnPrint,
                          showLoadingBttn: this.props.showLoadingBttn,
                       })
                    )
                  }
              </Col>
            </Row>
          </Col>
        </div>
      );
    }

    return (
      <Col xs={12}>
        <Spinner />
      </Col>
    );
  }// End of Render
}// End of Class

const mapStateToProps = createStructuredSelector({
  tasksList: getTasksList(),
  taskDetail: getTaskDetail(),
  showLoadingBttn: getshowLoadingBttn(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadUserTasks: bindActionCreators(loadUserTasks, dispatch),
    tasksLoaded: bindActionCreators(tasksLoaded, dispatch),
    loadUserTaskDetail: bindActionCreators(loadUserTaskDetail, dispatch),
    taskDetailLoaded: bindActionCreators(taskDetailLoaded, dispatch),
    startTask: bindActionCreators(startTask, dispatch),
    taskStarted: bindActionCreators(taskStarted, dispatch),
    finishTask: bindActionCreators(finishTask, dispatch),
    taskFinished: bindActionCreators(taskFinished, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRequired(Tasks));
