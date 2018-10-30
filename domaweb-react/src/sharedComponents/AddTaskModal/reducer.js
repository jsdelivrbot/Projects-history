/*
 *
 * AddTask reducer
 *
 */

import { fromJS } from 'immutable';

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
  TASKADD_FISNISHED,

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


const initialState = fromJS({
  customers: [],
  tasktypes: [],
  isLoading: false,
  taskAddStatus: null,
  taskSaveBtn: false,
  availableservices: [],
  isAvLoading: false,
  isTaskTypeLoading: false,
  newtasktypes: [],
  customerList: [],
  lazycustomerslist: [],
});

function addTaskReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CUSTOMERS:
      return state.set('customers')
                  .set('isLoading', true);

    case LOAD_CUSTOMERS_SUCCESS:
      return state.set('customers', action.customers)
                  .set('isLoading', false);

    case LOAD_CUSTOMERS_FAILED:
      return state.set('error', fromJS(action.error))

    case LOAD_INITIAL_CUSTOMERS:
      return state.set('lazycustomerslist');

    case LOAD_INITIAL_CUSTOMERS_SUCCESS:
      return state.set('lazycustomerslist', action.lazycustomerslist);

    case LOAD_INITIAL_CUSTOMERS_FAILED:
      return state.set('error', fromJS(action.error))

    case LAZYLOAD_CUSTOMERS:
      return state.set('customerList')
                  .set('isLoading', true);

    case LAZYLOAD_CUSTOMERS_SUCCESS:
        return state.set('customerList', action.customerlist)
                    .set('isLoading', false);

    case LAZYLOAD_CUSTOMERS_FAILED:
      return state.set('error', fromJS(action.error))

    case LOAD_TASKTYPES:
      return state.set('tasktypes')
                  .set('isTaskTypeLoading', true)

    case LOAD_TASKTYPES_SUCCESS:
      return state.set('tasktypes', action.tasktypes)
                  .set('isTaskTypeLoading', false);

    case LOAD_TASKTYPES_FAILED:
      return state.set('error', fromJS(action.error));

    case LOAD_NEWTASKTYPES:
      return state.set('newtasktypes');

    case LOAD_NEWTASKTYPES_SUCCESS:
      return state.set('newtasktypes', action.newtasktypes);

    case LOAD_NEWTASKTYPES_FAILED:
      return state.set('error', fromJS(action.error))

    // task add
    case TASKADD_SAVED:
      return state.set('taskSaveBtn', true);

    case TASKADD_SAVED_SUCCESS:
      return state.set('taskAddStatus', 'success')
                  .set('taskSaveBtn', false);

    case TASKADD_SAVED_FAILED:
      return state.set('taskAddStatus', 'failed')
                  .set('taskSaveBtn', false);

    case TASKADD_FISNISHED:
      return state.set('taskAddStatus', 'null')


    case AVAILABLE_SERVICES:
      return state.set('availableservices')
                  .set('isAvLoading', true)

    case AVAILABLE_SERVICES_SUCCESS:
      return state.set('availableservices', action.availableservices)
                  .set('isAvLoading', false);

    case AVAILABLE_SERVICES_FAILED:
      return state.set('error', fromJS(action.error))

    default:
      return state;
  }
}

export default addTaskReducer;
