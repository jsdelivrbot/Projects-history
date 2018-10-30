import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  LOAD_TIMETABS,
  LOAD_TIMETABS_SUCCESS,
  LOAD_TIMETABS_FAILED,

  LOAD_BOOKINGTYPES,
  LOAD_BOOKINGTYPES_SUCCESS,
  LOAD_BOOKINGTYPES_FAILED,

  SELECTED_TIMETAB,
  SELECTED_TIMETAB_SUCCESS,
  SELECTED_TIMETAB_FAILED,

  LOAD_TIMETAB_RECORD_SUCCESS,
 } from './constants';

import { loadSelectedTimeTab, loadBookingTypes,
 } from './actions';

import get from './api';

// getTimetabs Worker
export function* getTimetabs() {
  try {
    const requestunit = yield call(get.booking);

    // get only three unit fields (id, name, color) from the JSON response
    const timetabs = requestunit.map(({ id, name, color }) => ({
      id,
      name,
      color,
    }));

    // select the first timetab ID
    // selected first timetab ID will be actived when the booking Page is loaded
    const selectedId = timetabs[0].id;
    if (timetabs) {
      yield put({ type: LOAD_TIMETABS_SUCCESS, timetabs });
    }
    if (selectedId) {
      yield put(loadSelectedTimeTab(`${selectedId}`));
      yield put(push(`/booking/timetab/${selectedId}`));
    }
  } catch (errormsg) {
    yield put({ type: LOAD_TIMETABS_FAILED, errormsg });
  }
}


// getSelectedTimetab worker
export function* getSelectedTimetab(action) {
  const timetab = action.timetab;
  try {
    yield put({ type: SELECTED_TIMETAB_SUCCESS, timetab });
    yield put(loadBookingTypes(timetab));
  } catch (error) {
    yield put({ type: SELECTED_TIMETAB_FAILED, error });
  }
}

// getBookingTypes worker
export function* getBookingTypes(action) {
  try {
    const record = yield call(get.getunit, action.timetab);
    const bookingTypes = record.bookingType;
    const timetabRecord = record;
    if (bookingTypes) {
      yield put({ type: LOAD_BOOKINGTYPES_SUCCESS, bookingTypes });
      yield put({ type: LOAD_TIMETAB_RECORD_SUCCESS, timetabRecord });
    }
  } catch (error) {
    yield put({ type: LOAD_BOOKINGTYPES_FAILED, error });
  }
}

// Timetab watcher
export function* watchLoadTimeTabs() {
  yield takeEvery(LOAD_TIMETABS, getTimetabs);
}

// selected timetab watcher
export function* watchSelectedTimetab() {
  yield takeEvery(SELECTED_TIMETAB, getSelectedTimetab);
}


// Bookingtypes watcher
export function* watchBookingTypes() {
  yield takeEvery(LOAD_BOOKINGTYPES, getBookingTypes);
}


// Saga Demons
export default [
  watchLoadTimeTabs,
  watchSelectedTimetab,
  watchBookingTypes,
];
