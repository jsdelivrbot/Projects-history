/*
 *
 * Booking reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOAD_TASKS, LOAD_TASKS_SUCESS, LOAD_TASKS_FAILED,
  LOAD_TASK_DETAIL, LOAD_TASK_DETAIL_SUCESS, LOAD_TASK_DETAIL_FAILED,
  START_TASK, START_TASK_SUCESS, START_TASK_FAILED,
  FINISH_TASK, FINISH_TASK_SUCESS, FINISH_TASK_FAILED
} from './constants';

const initialState = fromJS({
  tasks: [],
  showLoadingBttn: [false, null],
  taskDetail: [],
});


// Tasks reducer

function taskReducer(state = initialState, action) {

  switch (action.type) {

    case LOAD_TASKS:
      return state;
    case LOAD_TASKS_SUCESS:
      return state.set('tasks', action.tasks);
    case LOAD_TASKS_FAILED:
      return state.set('taskserrormsg', fromJS(action.errormsg));

    case LOAD_TASK_DETAIL:
      return state;
    case LOAD_TASK_DETAIL_SUCESS:
      return state.set('taskDetail', action.details);
    case LOAD_TASK_DETAIL_FAILED:
      return state.set('taskserrormsg', fromJS(action.errormsg));

    case START_TASK:
      return state.set('showLoadingBttn', [true, action.id]);
    case START_TASK_SUCESS:
      return state.set('showLoadingBttn', [false, action.id]);
    case START_TASK_FAILED:
      return state.set('showLoadingBttn', [false, action.id]);

    case FINISH_TASK:
      return state.set('showLoadingBttn', [true, action.id]);
    case FINISH_TASK_SUCESS:
      return state.set('showLoadingBttn', [false, action.id]);
    case FINISH_TASK_FAILED:
      return state.set('showLoadingBttn', [false, action.id]);

    default:
      return state;
  }
}

export default taskReducer;
