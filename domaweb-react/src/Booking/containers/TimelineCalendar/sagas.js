import {
  takeLatest,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import moment from 'moment';
import { convertTimeForDatabase } from '../../../utils/dateUtil';

import {
  LOAD_EMPLOYEES_GROUP,
  LOAD_EMPLOYEES_GROUP_SUCCESS,
  LOAD_EMPLOYEES_GROUP_FAILED,

  LOAD_TASKDETAILS,
  LOAD_TASKDETAILS_SUCCESS,
  LOAD_TASKDETAILS_FAILED,

  TASKEDIT_SAVED,
  TASKEDIT_SAVED_SUCCESS,
  TASKEDIT_SAVED_FAILED,

  ITEMMOVE_LOAD,
  ITEMMOVE_LOAD_SUCCESS,
  ITEMMOVE_LOAD_FAILED,

  UPDATE_REPETITIONALL,
  UPDATE_REPETITIONALL_SUCCESS,
  UPDATE_REPETITIONALL_FAILED,

  LOAD_EMPLOYEES_ITEMS_SUCCESS,
  LOAD_GROUP_GROUP_SUCCESS,
  LOAD_GROUP_ITEM_SUCCESS,
  LOAD_CUSTOMERRESOURCES_SUCCESS,

  LOAD_TEMPLATEREPETITIONS_SUCCESS,
  LOAD_AVAILABLESERVICES_SUCCESS,
  LOAD_TASKTYPESERVICES_SUCCESS,
  LOAD_SPECIALHOLIDAYS_SUCCESS,

  TASKADD_SAVED,
  TASKADD_SAVED_SUCCESS,
  TASKADD_SAVED_FAILED,

  DELETE_EMPLOYEE_ITEM,
  DELETE_GROUP_ITEM,

  ADD_EMPLOYEE_ITEM,
  ADD_GROUP_ITEM,

  LOAD_AVAILABLE_SERVICES,
  LOAD_TASK_TYPES,

  UPDATE_SERVICE,
  DELETE_SERVICE,
  ADD_SERVICE,

  LOAD_TYPED_SERVICES,
  LOAD_ADDED_TASK,
  POST_REPETITIONS_VIEW,
  UPDATE_REPETITIONS_VIEW,

  GET_SPECIAL_HOLIDAYS,
 } from './constants';

 import API from './api';

// getEmployees Worker
export function* getEmployees(action) {
  try {
    // destructure action object
    const { id, visibleTimeStart, visibleTimeEnd } = action;
    const timetabRequestApi = yield call(API.getTimeatab, id);

    const employeeResources = timetabRequestApi.employeeResources;
    const customerResources = timetabRequestApi.customerResources;
    const getGroups = timetabRequestApi.groups;

    // Filter id, name, color fields from employeeResources
    const mapEmployeesGroup = employeeResources.map(({ id, name, color }) => ({
      id,
      title: name,
      color,
    }));

    // filter id, name, color fields from groupGroups
    const groupGroups = getGroups.map(({ id, name, color }) => ({
      id,
      title: name,
      color,
    }));

    const employeesItems = [];
    const employeesGroup = [];
    const groupItems = [];
    let timetabdetails;

    if (id && visibleTimeStart && visibleTimeEnd) {
      const startDateTime = convertTimeForDatabase(visibleTimeStart);
      const endDateTime = convertTimeForDatabase(visibleTimeEnd);
      timetabdetails = yield call(API.getTimetabDetailRange,
        id,
        startDateTime,
        endDateTime,
      );
    } else {
      const startTime = visibleTimeStart ? convertTimeForDatabase(visibleTimeStart) : moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss');
      const endTime = visibleTimeEnd ? convertTimeForDatabase(visibleTimeEnd) : moment().startOf('day').add(1, 'day').format('YYYY-MM-DDTHH:mm:ss');
      timetabdetails = yield call(API.getTimetabDetailRange,
        id,
        startTime,
        endTime,
      );
    }

    for (let k = 0; k < timetabdetails.length; k++) {
      if (timetabdetails[k].hasOwnProperty('employeeId')) {
        employeesItems.push({
          id: k + 1,
          taskId: timetabdetails[k].id,
          group: timetabdetails[k].employee.id,
          start: new Date(timetabdetails[k].plannedStartTime).getTime(),
          end: new Date(timetabdetails[k].plannedEndTime).getTime(),
          itemState: timetabdetails[k].itemState,
          customerName: `${timetabdetails[k].customer.firstName}
                        ${timetabdetails[k].customer.lastName}`,
          customerAddress: `${timetabdetails[k].customer.streetAddress}
                                    ${timetabdetails[k].customer.postalCode}
                                    ${timetabdetails[k].customer.postOffice}`,
          taskinfo: timetabdetails[k].info,
          phoneNum: timetabdetails[k].customer.phoneNumber,
          taskAddInfo: timetabdetails[k].customer.additionalInfo,
          plannedStartTime: timetabdetails[k].plannedStartTime,
          plannedEndTime: timetabdetails[k].plannedEndTime,
          repetitionId: timetabdetails[k].repetitionId,
        });
      } else {
        groupItems.push({
          id: timetabdetails[k].id,
          taskId: timetabdetails[k].id,
          group: timetabdetails[k].taskGroupId,
          title: timetabdetails[k].info,
          start: new Date(timetabdetails[k].plannedStartTime).getTime(),
          end: new Date(timetabdetails[k].plannedEndTime).getTime(),
          itemState: timetabdetails[k].itemState,
          customerName: `${timetabdetails[k].customer.firstName}
                        ${timetabdetails[k].customer.lastName}`,
          customerAddress: `${timetabdetails[k].customer.streetAddress}
                            ${timetabdetails[k].customer.postalCode}
                            ${timetabdetails[k].customer.postOffice}`,
          taskinfo: timetabdetails[k].info,
          phoneNum: timetabdetails[k].customer.phoneNumber,
          taskAddInfo: timetabdetails[k].customer.additionalInfo,
          plannedStartTime: timetabdetails[k].plannedStartTime,
          plannedEndTime: timetabdetails[k].plannedEndTime,
          repetitionId: timetabdetails[k].repetitionId,
        });
      }
    }

    // if tasks are assigned to employees then bring employee on top of the list
    // sort employees based on assigned tasks
    mapEmployeesGroup.forEach((employee) => {
      if (employeesItems.some(g => g.group === employee.id)) {
        employeesGroup.unshift(employee);
      } else {
        employeesGroup.push(employee);
      }
    })

    if (employeesGroup && employeesItems) {
      yield put({ type: LOAD_EMPLOYEES_ITEMS_SUCCESS, employeesItems });
      yield put({ type: LOAD_GROUP_GROUP_SUCCESS, groupGroups });
      yield put({ type: LOAD_GROUP_ITEM_SUCCESS, groupItems });
      yield put({ type: LOAD_CUSTOMERRESOURCES_SUCCESS, customerResources });
      yield put({ type: LOAD_EMPLOYEES_GROUP_SUCCESS, employeesGroup });
    }
  } catch (error) {
    yield put({ type: LOAD_EMPLOYEES_GROUP_FAILED, error });
  }
}

// getTaskDetails Worker
export function* getTaskDetails(action) {
  try {
    console.log('action', action);
    // getTaskDetailsApi call with an action.id === taskEditId
    const getTaskDetailsApi = yield call(API.getTaskDetails, action.id);
    console.log('getTaskDetailsApi', getTaskDetailsApi);

    // convert to array data type
    const taskDetailArray = [getTaskDetailsApi];

    // map/filter taskid, customerid, employeeid, hasBasicInfo, id, info, isCanceled,
    // itemState, itemTypeId, planedStartTime, plannedEndTime
    const taskdetails = taskDetailArray.map(({
      id,
      customerId,
      employeeId,
      hideBasicInfo,
      info,
      isCanceled,
      itemState,
      plannedStartTime,
      plannedEndTime,
      repetitionId,
      itemTypeId,
      taskGroupId,
      taskTemplate,
      newServices,
    }) => ({
      id,
      customerId,
      employeeId,
      hideBasicInfo,
      info,
      isCanceled,
      itemState,
      plannedStartTime,
      plannedEndTime,
      repetitionId,
      itemTypeId,
      taskGroupId,
      taskTemplateId: taskTemplate && taskTemplate.id,
      newServices,
    }),
    );

    if (taskdetails) {
      console.log('taskdetails', taskdetails);
      // make additional API  queries
      // get templaterepetitions, availableservices, tasktype, specialholidays, repetitions
      if (taskdetails[0].customerId) {
        const availableservices = yield call(API.getAvailableServices, taskdetails[0].customerId);
        if (availableservices) {
          yield put({ type: LOAD_AVAILABLESERVICES_SUCCESS, availableservices: availableservices.services });
        }
      }

      if (taskdetails[0].taskTemplateId) {
        // const availableservices = yield call(API.getAvailableServices, taskdetails[0].customerId);
        // yield put({ type: LOAD_AVAILABLESERVICES_SUCCESS, availableservices: availableservices.services });
        const templaterepetitions = yield call(API.getTemplateRepetitions, taskdetails[0].taskTemplateId);
        yield put({ type: LOAD_TEMPLATEREPETITIONS_SUCCESS, templaterepetitions });
      }

      // check if itemTypeId exist before making API call
      if (taskdetails[0].itemTypeId) {
        const tasktypeservices = yield call(API.getTasktypeServices, taskdetails[0].itemTypeId);

        yield put({ type: LOAD_TASKTYPESERVICES_SUCCESS, tasktypeservices });
        // check if taskTemplateId exist before making API call
      }
      const specialholidays = yield call(API.getSpecialHolidays);

      yield put({ type: LOAD_SPECIALHOLIDAYS_SUCCESS, specialholidays });
      yield put({ type: LOAD_TASKDETAILS_SUCCESS, taskdetails });
    }
  } catch (error) {
    yield put({ type: LOAD_TASKDETAILS_FAILED, error });
  }
}

// patchTaskEdit worker
export function* patchTaskEdit(action) {
  try {
    const patchRequest = yield call(API.taskEdit, action.id, action.payload);
    if (patchRequest) {
      yield put({ type: TASKEDIT_SAVED_SUCCESS });
      yield put({
        type: LOAD_EMPLOYEES_GROUP,
        id: action.getPayload.activeLinkId,
        visibleTimeStart: action.getPayload.visibleTimeStart,
        visibleTimeEnd: action.getPayload.visibleTimeEnd,
      });
    }
  } catch (error) {
    yield put({ type: TASKEDIT_SAVED_FAILED, error });
  }
}

// patchItemMove worker
export function* patchItemMove(action) {
  try {
    const patchRequest = yield call(API.updateSingleTask, action.id, action.payload);
    if (patchRequest) {
      yield put({ type: ITEMMOVE_LOAD_SUCCESS });

      const deleteFromRedux = action.changeTime ? DELETE_EMPLOYEE_ITEM : DELETE_GROUP_ITEM;
      const addToRedux = action.calendarType === 'EMPLOYEE_CALENDAR' ? ADD_EMPLOYEE_ITEM : ADD_GROUP_ITEM;
      yield put({ type: deleteFromRedux, id: action.item.id });
      yield put({ type: addToRedux, data: action.item });
      yield put({
        type: LOAD_EMPLOYEES_GROUP,
        id: action.getPayload.id,
        visibleTimeStart: action.getPayload.visibleTimeStart,
        visibleTimeEnd: action.getPayload.visibleTimeEnd,
      });
    }
  } catch (error) {
    yield put({ type: ITEMMOVE_LOAD_FAILED, error });
  }
}

// patchRepetitionUpdate worker
export function* patchRepetitionUpdate(action) {
  try {
    const patchRequest = yield call(API.updateRepeatedTask, action.id, action.payload);
    if (patchRequest) {
      yield put({ type: UPDATE_REPETITIONALL_SUCCESS });

      const deleteFromRedux = action.changeTime ? DELETE_EMPLOYEE_ITEM : DELETE_GROUP_ITEM;
      const addToRedux = action.calendarType === 'EMPLOYEE_CALENDAR' ? ADD_EMPLOYEE_ITEM : ADD_GROUP_ITEM;
      yield put({ type: deleteFromRedux, id: action.item.id });
      yield put({ type: addToRedux, data: action.item });
      yield put({
        type: LOAD_EMPLOYEES_GROUP,
        id: action.getPayload.id,
        visibleTimeStart: action.getPayload.visibleTimeStart,
        visibleTimeEnd: action.getPayload.visibleTimeEnd,
      });
    }
  } catch (error) {
    yield put({ type: UPDATE_REPETITIONALL_FAILED, error });
  }
}

// addTaskRequest worker
export function* addTaskRequest(action) {
  try {
    const addTaskPost = yield call(API.addTask, action.payload);
    if (addTaskPost) {
      yield put({ type: TASKADD_SAVED_SUCCESS });
      yield put({
        type: LOAD_EMPLOYEES_GROUP,
        id: action.getPayload.activeLinkId,
        visibleTimeStart: action.getPayload.visibleTimeStart,
        visibleTimeEnd: action.getPayload.visibleTimeEnd,
      });
      yield put({
        type: LOAD_ADDED_TASK,
        id: addTaskPost.id,
      });
    }
  } catch (error) {
    yield put({ type: TASKADD_SAVED_FAILED, error });
  }
}

// addTaskRequest worker
export function* loadAvailableServices(action) {
  try {
    const availableservices = yield call(API.getAvailableServices, action.id);
    if (availableservices) {
      yield put({ type: LOAD_AVAILABLESERVICES_SUCCESS, availableservices: availableservices.services });
    }
    if (action.loadTypedServices) {
      yield put({ type: LOAD_TYPED_SERVICES, typedServices: availableservices.typedServices });
    }
  } catch (error) {
    // yield put({ type: TASKADD_SAVED_FAILED, error });
  }
}

// addTaskRequest worker
export function* loadTaskTypes(action) {
  try {
    const tasktypeservices = yield call(API.getTasktypeServices, action.id);

    if (tasktypeservices) {
      yield put({ type: LOAD_TASKTYPESERVICES_SUCCESS, tasktypeservices });
    }
  } catch (error) {
    // yield put({ type: TASKADD_SAVED_FAILED, error });
  }
}

// load repetitions
export function* loadRepetitionsView(action) {
  try {
    if (action) {
      const postRepetitionsView = yield call(API.postRepetitionsView, action.payload);

      if (postRepetitionsView) {
        yield put({
          type: UPDATE_REPETITIONS_VIEW,
          id: action.id,
          data: postRepetitionsView,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// Get special holidays
export function* getSpecialHolidays(action) {
  try {
    const specialholidays = yield call(API.getSpecialHolidays);

    yield put({ type: LOAD_SPECIALHOLIDAYS_SUCCESS, specialholidays });
  } catch (error) {
    console.log(error);
  }
}

// Update service
export function* updateService(action) {
  try {
    yield call(API.updateService, action.taskId, action.payload);
  } catch (error) {
    console.log(error);
  }
}

// Delete service
export function* deleteService(action) {
  try {
    yield call(API.deleteService, action.taskId, action.serviceId);
  } catch (error) {
    console.log(error);
  }
}

// Add service
export function* addService(action) {
  try {
    yield call(API.addService, action.taskId, action.payload);
  } catch (error) {
    console.log(error);
  }
}

// Employee watcher
export function* watchLoadEmployees() {
  yield takeLatest(LOAD_EMPLOYEES_GROUP, getEmployees);
}

// Taskdetails watcher
export function* watchLoadTaskDetails() {
  yield takeLatest(LOAD_TASKDETAILS, getTaskDetails);
}

// TaskEdit watcher
export function* watchEditTask() {
  yield takeLatest(TASKEDIT_SAVED, patchTaskEdit);
}

// watchItemMove watcher
export function* watchItemMove() {
  yield takeLatest(ITEMMOVE_LOAD, patchItemMove);
}

// watchRepetitionUpdate watcher
export function* watchRepetitionUpdate() {
  yield takeLatest(UPDATE_REPETITIONALL, patchRepetitionUpdate);
}

// watchTaskAdd watcher
export function* watchAvailableServices() {
  yield takeLatest(LOAD_AVAILABLE_SERVICES, loadAvailableServices);
}

// watchTaskAdd watcher
export function* watchTaskTypes() {
  yield takeLatest(LOAD_TASK_TYPES, loadTaskTypes);
}

// watchTaskAdd watcher
export function* watchTaskAdd() {
  yield takeLatest(TASKADD_SAVED, addTaskRequest);
}

// watchServiceUpdate watcher
export function* watchServiceUpdate() {
  yield takeLatest(UPDATE_SERVICE, updateService);
}

// watchServiceDelete watcher
export function* watchServiceDelete() {
  yield takeLatest(DELETE_SERVICE, deleteService);
}

// watchServiceAdd watcher
export function* watchServiceAdd() {
  yield takeLatest(ADD_SERVICE, addService);
}

// watchServiceAdd watcher
export function* watchRepetitionsView() {
  yield takeEvery(POST_REPETITIONS_VIEW, loadRepetitionsView);
}

// watchServiceAdd watcher
export function* watchSpecialHolidays() {
  yield takeEvery(GET_SPECIAL_HOLIDAYS, getSpecialHolidays);
}

// Saga Demons
export default [
  watchLoadEmployees,
  watchLoadTaskDetails,
  watchEditTask,
  watchItemMove,
  watchRepetitionUpdate,
  watchTaskAdd,
  watchAvailableServices,
  watchTaskTypes,
  watchServiceUpdate,
  watchServiceDelete,
  watchServiceAdd,
  loadRepetitionsView,
  watchRepetitionsView,
  watchSpecialHolidays,
];
