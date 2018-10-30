import moment from 'moment';
import { takeEvery, call, put } from 'redux-saga/effects';
import { getFormatedDate } from '../utils/dateUtil';
import API from './api';

import {
  LOAD_TASKS, LOAD_TASKS_SUCESS, LOAD_TASKS_FAILED,
  LOAD_TASK_DETAIL, LOAD_TASK_DETAIL_SUCESS, LOAD_TASK_DETAIL_FAILED,
  START_TASK, START_TASK_SUCESS, START_TASK_FAILED,
  FINISH_TASK, FINISH_TASK_SUCESS, FINISH_TASK_FAILED,
} from './constants';


// Fetch Tasks list
export function* getTasksList(action) {
  const dateFrom = `${action.date}t00:00:00`;
  const dateTo = `${getFormatedDate(moment(action.date).add(1, 'd'))}t00:00:00`;

  try {
    const tasks = yield call(API.getTasksList, dateFrom, dateTo);
    if (tasks) {
      yield put({ type: LOAD_TASKS_SUCESS, tasks });
    }
  } catch (errormsg) {
    yield put({ type: LOAD_TASKS_FAILED, errormsg });
  }
}

export function* getTasks() {
  const action = yield takeEvery(LOAD_TASKS, getTasksList);
}

// Fetch Tasks list
export function* taskDetail(action) {
  try {
    const details = yield call(API.getTaskDetail, action.id);
    if (details) {
      yield put({ type: LOAD_TASK_DETAIL_SUCESS, details });
    }
  } catch (errormsg) {
    yield put({ type: LOAD_TASK_DETAIL_FAILED, errormsg });
  }
}

export function* getTaskDetail() {
  const action = yield takeEvery(LOAD_TASK_DETAIL, taskDetail);
}

// Start Tasks
export function* startTheTask(action) {
  try {
    const started = yield call(API.startTask, action.id, action.payload);
    if (started) {
      yield getTasksList({ date: action.date });
      yield taskDetail({ id: action.id });
      yield put({ type: START_TASK_SUCESS, id: action.id });
    }
  } catch (errormsg) {
    yield put({ type: START_TASK_FAILED, errormsg });
  }
}

export function* startTaskWatcher() {
  const action = yield takeEvery(START_TASK, startTheTask);
}

// Finish Tasks
export function* finishTheTask(action) {
  try {
    const finished = yield call(API.finishTask, action.id, action.payload);
    if (finished) {
      yield getTasksList({ date: action.date });
      yield taskDetail({ id: action.id });
      yield put({ type: FINISH_TASK_SUCESS, id: action.id });
    }
  } catch (errormsg) {
    yield put({ type: FINISH_TASK_FAILED, errormsg });
  }
}

export function* finishTaskWatcher() {
  const action = yield takeEvery(FINISH_TASK, finishTheTask);
}

// All sagas to be loaded
export default [
  getTasks,
  getTaskDetail,
  startTaskWatcher,
  finishTaskWatcher,
];
