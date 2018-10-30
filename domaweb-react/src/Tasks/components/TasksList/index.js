import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment';

import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router';

import Spinner from '../../../sharedComponents/Spinner'
import TaskListInfoBar from '../TaskListInfoBar';
import Task from '../Task';
import AddTaskModal from '../../../sharedComponents/AddTaskModal';

import styles from './tasksList-styles.scss';


class TaskList extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      addTaskModal: false,
    };
    this.changeRoute = this.changeRoute.bind(this);
  }

  toggleAddTaskModal = (event) => {
      if(event){
        event.stopPropagation();
      }

      this.setState({ addTaskModal: !this.state.addTaskModal });
  }

  changeRoute = (id) => {
    this.props.router.push(`/tasks/${this.props.params.date}/${id}`);
  }

  renderContent = () => {
    const tasks = this.props.tasks;
    console.log('In task List');
    return (
      <div>
        <div className={styles.tasks_main}>
          <TaskListInfoBar totalTasks={tasks.length || 0} userName={`${this.props.userDetail.firstName} ${this.props.userDetail.lastName}`} />
        </div>
        {tasks.map(task => <Task
          task={task}
          key={task.id}
          changeRoute={this.changeRoute}
          startTask={id => this.props.startTask(id)}
          finishTask={(id, dateObject) => this.props.finishTask(id, dateObject)}
          router={this.props.router}
          showLoadingBttn= {this.props.showLoadingBttn}
          />)}
        <div className={this.props.params.id ? styles.task_main_detail_open : styles.task_main}>
          <span className={styles.tasks_main_circle} onClick={this.toggleAddTaskModal}> + </span>
        </div>
        <AddTaskModal
          show={this.state.addTaskModal}
          onClose={this.toggleAddTaskModal}
          startDate={this.props.params.date}
          endDate={this.props.params.date}
          employeeId={this.props.userDetail.id}
          addTaskSuccesshandler={this.props.loadTasks}
        />
      </div>
    );
  }

  render() {
    return this.props.tasks.length !== undefined ? this.renderContent() : <Spinner />;
  }
}
/*
TaskList.propTypes = {
  tasks: PropTypes.object.isRequired,
};*/

export default withRouter(TaskList);
