/* Tasks Actions */

import {
       LOAD_TASKS, LOAD_TASKS_SUCESS, LOAD_TASKS_FAILED,
       LOAD_TASK_DETAIL, LOAD_TASK_DETAIL_SUCESS, LOAD_TASK_DETAIL_FAILED,
       START_TASK, START_TASK_SUCESS, START_TASK_FAILED,
       FINISH_TASK, FINISH_TASK_SUCESS, FINISH_TASK_FAILED
      } from './constants';

export function loadUserTasks(date) {
  return {
    type: LOAD_TASKS,
    date,
  };
}

export function tasksLoaded(tasks) {
  return {
    type: LOAD_TASKS_SUCESS,
    tasks,
  };
}

export function tasksLoadedFailed(tasks) {
  return {
    type: LOAD_TASKS_FAILED,
    tasks,
  };
}


export function loadUserTaskDetail(id) {
  return {
    type: LOAD_TASK_DETAIL,
    id,
  };
}

export function taskDetailLoaded(taskDetail) {
  return {
    type: LOAD_TASK_DETAIL_SUCESS,
    taskDetail,
  };
}


export function taskDetailFailed(taskDetail) {
  return {
    type: LOAD_TASK_DETAIL_FAILED,
    taskDetail,
  };
}

export function startTask(id, date, payload) {
  return {
    type: START_TASK,
    id,
    date,
    payload,
  };
}

export function taskStarted() {
  return {
    type: START_TASK_SUCESS,
  };
}

export function taskStartedFailed() {
  return {
    type: START_TASK_FAILED,
  };
}

export function finishTask(id, date, payload) {
  return {
    type: FINISH_TASK,
    id,
    date,
    payload,
  };
}

export function taskFinished() {
  return {
    type: FINISH_TASK_SUCESS,
  };
}

export function taskFinishFailed() {
  return {
    type: FINISH_TASK_FAILED,
  };
}
