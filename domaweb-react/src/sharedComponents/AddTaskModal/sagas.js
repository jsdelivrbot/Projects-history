import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';
import _ from 'lodash'
import request from 'superagent';

import {
  LOAD_CUSTOMERS,
  LOAD_CUSTOMERS_SUCCESS,
  LOAD_CUSTOMERS_FAILED,

  LAZYLOAD_CUSTOMERS,
  LAZYLOAD_CUSTOMERS_SUCCESS,
  LAZYLOAD_CUSTOMERS_FAILED,

  LOAD_TASKTYPES,
  LOAD_TASKTYPES_SUCCESS,
  LOAD_TASKTYPES_FAILED,

  TASKADD_SAVED,
  TASKADD_SAVED_SUCCESS,
  TASKADD_SAVED_FAILED,

  AVAILABLE_SERVICES,
  AVAILABLE_SERVICES_SUCCESS,
  AVAILABLE_SERVICES_FAILED,

  LOAD_NEWTASKTYPES,
  LOAD_NEWTASKTYPES_SUCCESS,
  LOAD_NEWTASKTYPES_FAILED,

  LOAD_INITIAL_CUSTOMERS,
  LOAD_INITIAL_CUSTOMERS_SUCCESS,
  LOAD_INITIAL_CUSTOMERS_FAILED

} from './constants';

import * as taskTypesSelector from './selectors';
import {
  getCustomers as getCustomersAPI,
  getTasktypes as getTasktypesAPI,
  getTask as getTaskAPI,
  getAvailableServices as getAvailableServicesAPI,
  addTask as addTaskAPI,
  getLazyLoadedCustomers as lazyLoadCustomers,
} from './api';

const url = process.env.CONFIG.apiUrl;


// customer load worker
export function* getCustomersList(action) {
  try {
    const customers = yield call(getCustomersAPI);
    const tasktypes = yield call(getTasktypesAPI);
    if (customers) {
      yield put({ type: LOAD_CUSTOMERS_SUCCESS, customers });
      yield put({ type: LOAD_TASKTYPES_SUCCESS, tasktypes });
    }
  } catch (error) {
    yield put({ type: LOAD_CUSTOMERS_FAILED, error });
  }
}


// task types load worker
export function* getTaskTypesList() {
  try {
    const tasktypes = yield call(getTasktypesAPI);
    if (tasktypes) {
      yield put({ type: LOAD_TASKTYPES_SUCCESS, tasktypes });
    }
  } catch (error) {
    yield put({ type: LOAD_TASKTYPES_FAILED, error });
  }
}

// get lazy load customers list worker
export function* getLazyCustomers(action) {
  try {
    //const customerList = yield call(lazyLoadCustomers, parseInt(action.limit, 10));
    if (customerList) {
      yield put({ type: LAZYLOAD_CUSTOMERS_SUCCESS, customerList });
    }
  } catch (error) {
    yield put({ type: LAZYLOAD_CUSTOMERS_FAILED, error });
  }
}

// addTaskRequest worker
export function* addTaskRequest(action) {
  const { payload } = action;
  try {
    const addTaskPost = yield call(addTaskAPI, payload);
    if (addTaskPost) yield put({ type: TASKADD_SAVED_SUCCESS });
  } catch (error) {
    yield put({ type: TASKADD_SAVED_FAILED, error });
  }
}


// getAvailableServices worker
export function* getAvailableServiceList(action) {
  try {
    // yield availableServices with customer Id
    const availableservices = yield call(getAvailableServicesAPI, parseInt(action.id, 10));
    // get typedServices
    const typedservices = availableservices.typedServices;
    const newtasktypes = [];

    // filter tasktypes from availableServices
    typedservices.forEach(item =>  {
      newtasktypes.push({
        id: item.taskType.id,
        name: item.taskType.name,
        color: item.taskType.color
      })
    })
    if (availableservices) {
      yield put({ type: AVAILABLE_SERVICES_SUCCESS, availableservices });
      yield put({ type: LOAD_NEWTASKTYPES_SUCCESS, newtasktypes });
    }
  } catch (error) {
    yield put({ type: AVAILABLE_SERVICES_FAILED, error });
  }
}

// getInitialCustomers worker
export function* getInitialCustomers(action) {
  try {
    // call getCustomersAPI
    const getcustomers = yield call(getCustomersAPI);
    const lazycustomerslist = [];

    // map only id, firstName, lastName fields from getcustomers response
    getcustomers.forEach(item =>  {
      lazycustomerslist.push({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName
      })
    })

    if (lazycustomerslist) {
      yield put({ type: LOAD_INITIAL_CUSTOMERS_SUCCESS, lazycustomerslist });
    }
  } catch (error) {
    yield put({ type: LOAD_INITIAL_CUSTOMERS_FAILED, error });
  }
}

export function* addTaskRootSaga() {
  yield takeLatest(LOAD_CUSTOMERS, getCustomersList)
  yield takeLatest(LOAD_TASKTYPES, getTaskTypesList)
  yield takeLatest(AVAILABLE_SERVICES, getAvailableServiceList)
  yield takeLatest(TASKADD_SAVED, addTaskRequest)
  yield takeLatest(LAZYLOAD_CUSTOMERS, getLazyCustomers)
  yield takeLatest(LOAD_INITIAL_CUSTOMERS, getInitialCustomers)
}


// All saga demons to be loaded
export default [
  addTaskRootSaga,
];
