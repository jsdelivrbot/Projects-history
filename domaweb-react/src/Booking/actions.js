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

  LOAD_TIMETAB_RECORD,
  LOAD_TIMETAB_RECORD_SUCCESS,
  LOAD_TIMETAB_RECORD_FAILED,

} from './constants';

export function loadTimetabs() {
  return {
    type: LOAD_TIMETABS,
  };
}

export function timetabsLoaded(timetab) {
  return {
    type: LOAD_TIMETABS_SUCCESS,
    timetab,
  };
}

export function timetabsLoadFailed(error) {
  return {
    type: LOAD_TIMETABS_FAILED,
    error,
  };
}

export function loadBookingTypes(timetab) {
  return {
    type: LOAD_BOOKINGTYPES,
    timetab,
  };
}

export function loadBookingTypesSuccess(bookingTypes) {
  return {
    type: LOAD_BOOKINGTYPES_SUCCESS,
    bookingTypes,
  };
}

export function loadBookingTypesFailed(error) {
  return {
    type: LOAD_BOOKINGTYPES_FAILED,
    error,
  };
}


export function loadtimeTab(timetab) {
  return {
    type: LOAD_TIMETAB_RECORD,
    timetab,
  };
}

export function loadtimeTabSuccess(timetabRecord) {
  return {
    type: LOAD_TIMETAB_RECORD_SUCCESS,
    timetabRecord,
  };
}

export function loadtimeTabFailed(error) {
  return {
    type: LOAD_TIMETAB_RECORD_FAILED,
    error,
  };
}

export function loadSelectedTimeTab(timetab) {
  return {
    type: SELECTED_TIMETAB,
    timetab,
  };
}

export function loadSelectedTimeTabSuccess(timetab) {
  return {
    type: SELECTED_TIMETAB_SUCCESS,
    timetab,
  };
}

export function loadSelectedTimeTabFailed(error) {
  return {
    type: SELECTED_TIMETAB_FAILED,
    error,
  };
}
