/*
 *
 * Booking actions
 *
 */

import {
  LOAD_EMPLOYEES_GROUP,
  LOAD_EMPLOYEES_GROUP_SUCCESS,
  LOAD_EMPLOYEES_GROUP_FAILED,

  LOAD_EMPLOYEES_ITEMS,
  LOAD_EMPLOYEES_ITEMS_SUCCESS,
  LOAD_EMPLOYEES_ITEMS_FAILED,

  LOAD_GROUP_GROUP_SUCCESS,
  LOAD_GROUP_ITEM_SUCCESS,

  LOAD_CUSTOMERRESOURCES_SUCCESS,

  LOAD_TASKDETAILS,
  LOAD_TASKDETAILS_SUCCESS,
  LOAD_TASKDETAILS_FAILED,

  TASKEDIT_SAVED,
  TASKEDIT_SAVED_SUCCESS,
  TASKEDIT_SAVED_FAILED,

  LOAD_TEMPLATEREPETITIONS_SUCCESS,
  LOAD_AVAILABLESERVICES_SUCCESS,
  LOAD_TASKTYPESERVICES_SUCCESS,
  LOAD_SPECIALHOLIDAYS_SUCCESS,
  LOAD_REPETITIONSVIEW_SUCCESS,

  ITEMMOVE_LOAD,
  ITEMMOVE_LOAD_SUCCESS,
  ITEMMOVE_LOAD_FAILED,

  UPDATE_REPETITIONALL,
  UPDATE_REPETITIONALL_SUCCESS,
  UPDATE_REPETITIONALL_FAILED,

  TASKADD_SAVED,
  TASKADD_SAVED_SUCCESS,
  TASKADD_SAVED_FAILED,

  ADD_GROUP_ITEM,
  ADD_EMPLOYEE_ITEM,
  DELETE_EMPLOYEE_ITEM,
  DELETE_GROUP_ITEM,

  TASKEDIT_EDIT_END,
  TASKADD_SAVED_END,
  LOAD_AVAILABLE_SERVICES,
  LOAD_TASK_TYPES,

  UPDATE_SERVICE,
  DELETE_SERVICE,
  ADD_SERVICE,

  NULL_SERVICES_AND_TASKTYPES,
  POST_REPETITIONS_VIEW,
  GET_SPECIAL_HOLIDAYS,
  SELECT_CALENDAR_ITEM,
} from './constants';

export function loadEmployeesGroup(id, visibleTimeStart, visibleTimeEnd) {
  return {
    type: LOAD_EMPLOYEES_GROUP,
    id,
    visibleTimeStart,
    visibleTimeEnd,
  };
}

export function loadEmployeesGroupSuccess(employeesGroup) {
  return {
    type: LOAD_EMPLOYEES_GROUP_SUCCESS,
    employeesGroup,
  };
}

export function loadEmployeesGroupFailed(error) {
  return {
    type: LOAD_EMPLOYEES_GROUP_FAILED,
    error,
  };
}

export function loadEmployeesItems(id) {
  return {
    type: LOAD_EMPLOYEES_ITEMS,
    id,
  };
}

export function loadEmployeesItemsSuccess(employeesItems) {
  return {
    type: LOAD_EMPLOYEES_ITEMS_SUCCESS,
    employeesItems,
  };
}

export function loadEmployeesItemsFailed(error) {
  return {
    type: LOAD_EMPLOYEES_ITEMS_FAILED,
    error,
  };
}

export function loadgroupGroupSuccess(groupGroups) {
  return {
    type: LOAD_GROUP_GROUP_SUCCESS,
    groupGroups,
  };
}

export function loadgroupItemsSuccess(groupItems) {
  return {
    type: LOAD_GROUP_ITEM_SUCCESS,
    groupItems,
  };
}

export function loadCustomerResourcessSuccess(customerResources) {
  return {
    type: LOAD_CUSTOMERRESOURCES_SUCCESS,
    customerResources,
  };
}

export function loadTaskDetails(id) {
  return {
    type: LOAD_TASKDETAILS,
    id,
  };
}

export function loadTaskDetailsSuccess(taskdetails) {
  return {
    type: LOAD_TASKDETAILS_SUCCESS,
    taskdetails,
  };
}

export function loadTaskDetailsFailed(error) {
  return {
    type: LOAD_TASKDETAILS_FAILED,
    error,
  };
}

export function TaskEdit(id, payload, getPayload) {
  return {
    type: TASKEDIT_SAVED,
    id,
    payload,
    getPayload,
  };
}

export function TaskEditSaved() {
  return {
    type: TASKEDIT_SAVED_SUCCESS,
  };
}

export function TaskEditFailed(error) {
  return {
    type: TASKEDIT_SAVED_FAILED,
    error,
  };
}

export function TaskEditEnd() {
  return {
    type: TASKEDIT_EDIT_END,
  };
}

export function TaskAddEnd() {
  return {
    type: TASKADD_SAVED_END,
  };
}

export function loadTemplateRepetitionsSuccess(templaterepetitions) {
  return {
    type: LOAD_TEMPLATEREPETITIONS_SUCCESS,
    templaterepetitions,
  };
}


export function loadAvailableServicesSuccess(availableservices) {
  return {
    type: LOAD_AVAILABLESERVICES_SUCCESS,
    availableservices,
  };
}

export function loadServiceTaskTypeSuccess(servicetasktype) {
  return {
    type: LOAD_TASKTYPESERVICES_SUCCESS,
    servicetasktype,
  };
}

export function loadSpecialHolidaysSuccess(specialholidays) {
  return {
    type: LOAD_SPECIALHOLIDAYS_SUCCESS,
    specialholidays,
  };
}

export function loadRepetitionsViewSuccess(repetitionsview) {
  return {
    type: LOAD_REPETITIONSVIEW_SUCCESS,
    repetitionsview,
  };
}

// task item move
export function itemMoved(data) {
  return {
    type: ITEMMOVE_LOAD,
    id: data.id,
    payload: data.payload,
    getPayload: data.getPayload,
    changeTime: data.changeTime,
    calendarType: data.calendarType,
    item: data.item,
  };
}

export function itemMovedSaved() {
  return {
    type: ITEMMOVE_LOAD_SUCCESS,
  };
}

export function itemMovedFailed(error) {
  return {
    type: ITEMMOVE_LOAD_FAILED,
    error,
  };
}

// task item update repetition all
export function repetitionUpdateAll(data) {
  return {
    type: UPDATE_REPETITIONALL,
    id: data.id,
    payload: data.payload,
    getPayload: data.getPayload,
    changeTime: data.changeTime,
    calendarType: data.calendarType,
    item: data.item,
  };
}

export function repetitionUpdateAllSaved() {
  return {
    type: UPDATE_REPETITIONALL_SUCCESS,
  };
}

export function repetitionUpdateAllFailed(error) {
  return {
    type: UPDATE_REPETITIONALL_FAILED,
    error,
  };
}

// task ADD
export function taskAdd(payload, getPayload) {
  return {
    type: TASKADD_SAVED,
    payload,
    getPayload,
  };
}

export function taskAddSuccess() {
  return {
    type: TASKADD_SAVED_SUCCESS,
  };
}

export function taskAddFailed(error) {
  return {
    type: TASKADD_SAVED_FAILED,
    error,
  };
}

export function addGroupItem(data) {
  return {
    type: ADD_GROUP_ITEM,
    data,
  };
}

export function addEmployeeItem(data) {
  return {
    type: ADD_EMPLOYEE_ITEM,
    data,
  };
}

export function deleteEmployeeItem(data) {
  return {
    type: DELETE_EMPLOYEE_ITEM,
    data,
  };
}

export function deleteGroupItem(data) {
  return {
    type: DELETE_GROUP_ITEM,
    data,
  };
}

export function loadAvailableServices(id, loadTypedServices) {
  return {
    type: LOAD_AVAILABLE_SERVICES,
    id,
    loadTypedServices,
  };
}

export function loadTaskTypes(id) {
  return {
    type: LOAD_TASK_TYPES,
    id,
  };
}

export function updateService(taskId, payload) {
  return {
    type: UPDATE_SERVICE,
    taskId,
    payload,
  };
}

export function addService(taskId, payload) {
  return {
    type: ADD_SERVICE,
    taskId,
    payload,
  };
}

export function deleteService(taskId, serviceId) {
  return {
    type: DELETE_SERVICE,
    taskId,
    serviceId,
  };
}

export function nullServicesAndTasktypes() {
  return {
    type: NULL_SERVICES_AND_TASKTYPES,
  };
}

export function loadRepetitionsView(id, payload) {
  return {
    type: POST_REPETITIONS_VIEW,
    id,
    payload,
  };
}

export function loadSpecialHolidays() {
  return {
    type: GET_SPECIAL_HOLIDAYS,
  };
}

export function selectCalendarItem(id) {
  return {
    type: SELECT_CALENDAR_ITEM,
    id,
  };
}
