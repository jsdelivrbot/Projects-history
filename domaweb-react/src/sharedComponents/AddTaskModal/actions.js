import {
  LOAD_CUSTOMERS,
  LOAD_CUSTOMERS_SUCCESS,
  LOAD_CUSTOMERS_FAILED,

  LOAD_TASKTYPES,
  LOAD_TASKTYPES_SUCCESS,
  LOAD_TASKTYPES_FAILED,

  TASKADD_SAVED,
  TASKADD_SAVED_SUCCESS,
  TASKADD_SAVED_FAILED,

  TASKADD_FISNISHED,

  AVAILABLE_SERVICES,
  AVAILABLE_SERVICES_SUCCESS,
  AVAILABLE_SERVICES_FAILED,

  LOAD_NEWTASKTYPES,
  LOAD_NEWTASKTYPES_SUCCESS,
  LOAD_NEWTASKTYPES_FAILED,

  LAZYLOAD_CUSTOMERS,
  LAZYLOAD_CUSTOMERS_SUCCESS,
  LAZYLOAD_CUSTOMERS_FAILED,

  LOAD_INITIAL_CUSTOMERS,
  LOAD_INITIAL_CUSTOMERS_SUCCESS,
  LOAD_INITIAL_CUSTOMERS_FAILED

} from './constants';

export function loadCustomers() {
  return {
    type: LOAD_CUSTOMERS,
  };
}

export function loadCustomersSuccess(customers) {
  return {
    type: LOAD_CUSTOMERS_SUCCESS,
    customers,
  };
}

export function loadCustomersFailed(error) {
  return {
    type: LOAD_CUSTOMERS_FAILED,
    error,
  };
}

export function loadInitialCustomers() {
  return {
    type: LOAD_INITIAL_CUSTOMERS,
  };
}

export function loadInitialCustomersSuccess(lazycustomerslist) {
  return {
    type: LOAD_INITIAL_CUSTOMERS_SUCCESS,
    lazycustomerslist,
  };
}

export function loadInitialCustomersFailed(error) {
  return {
    type: LOAD_INITIAL_CUSTOMERS_FAILED,
    error,
  };
}

export function lazyLoadCustomers(limit) {
  return {
    type: LAZYLOAD_CUSTOMERS,
    limit
  };
}

export function lazyLoadCustomersSuccess(customerlist) {
  return {
    type: LAZYLOAD_CUSTOMERS_SUCCESS,
    customerlist,
  };
}

export function lazyLoadCustomersFailed(error) {
  return {
    type: LAZYLOAD_CUSTOMERS_FAILED,
    error,
  };
}

export function loadTaskTypes() {
  return {
    type: LOAD_TASKTYPES,
  };
}

export function loadTaskTypesSuccess(tasktypes) {
  return {
    type: LOAD_TASKTYPES_SUCCESS,
    tasktypes,
  };
}

export function loadTaskTypesFailed(error) {
  return {
    type: LOAD_TASKTYPES_FAILED,
    error,
  };
}


export function loadNewTaskTypes() {
  return {
    type: LOAD_NEWTASKTYPES,
  };
}

export function loadNewTaskTypesSuccess(newtasktypes) {
  return {
    type: LOAD_NEWTASKTYPES_SUCCESS,
    newtasktypes,
  };
}

export function loadNewTaskTypesFailed(error) {
  return {
    type: LOAD_NEWTASKTYPES_FAILED,
    error,
  };
}

// task ADD
export function taskAdd(payload) {
  return {
    type: TASKADD_SAVED,
    payload,
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

export function taskAddCompleted() {
  return {
    type: TASKADD_FISNISHED,
  };
}


export function loadAvailableService(id) {
  return {
    type: AVAILABLE_SERVICES,
    id
  };
}

export function loadAvailableServiceSuccess(availableservices) {
  return {
    type: AVAILABLE_SERVICES_SUCCESS,
    availableservices,
  };
}

export function loadAvailableServiceFailed(error) {
  return {
    type: AVAILABLE_SERVICES_FAILED,
    error,
  };
}
