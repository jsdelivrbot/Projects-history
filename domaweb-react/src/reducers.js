/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import languageProviderReducer from 'LanguageProvider/reducer';
import medicationListReducer from 'MedicationList/containers/MedicationList/reducer';
import authRequiredReducer from 'sharedComponents/AuthRequired/reducer';
import errorReducer from 'ErrorContainer/reducer';
import addReportReducer from 'sharedComponents/AddReport/reducer';
import addTaskReducer from 'sharedComponents/AddTaskModal/reducer';
import notificationReducer from 'ErrorContainer/reducer';
import reportDisplayReducer from './sharedComponents/ReportDisplay/containers/ReportDisplay/reducer';


/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    auth: authRequiredReducer,
    language: languageProviderReducer,
    medicationList: medicationListReducer,
    notifications: notificationReducer,
    errors: errorReducer,
    addReport: addReportReducer,
    reports: reportDisplayReducer,
    addTask: addTaskReducer,
    ...asyncReducers,
  });
}
