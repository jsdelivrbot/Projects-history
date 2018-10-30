/*
 *
 * CurrentMedication actions
 *
 */

import {
  DEFAULT_ACTION, FETCH_MEDICATION_LIST_SUCCESS, SET_CONTINUOUS, SET_TEMPORARY, SET_WHEN_NEEDED, SET_COMING,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchMedicationListSuccess(list) {
  return {
    type: FETCH_MEDICATION_LIST_SUCCESS,
    data: list,
  };
}

export function setContinuous(list) {
  return {
    type: SET_CONTINUOUS,
    data: list,
  }
}
export function setTemporary(list) {
  return {
    type: SET_TEMPORARY,
    data: list,
  }
}

export function setWhenNeeded(list) {
  return {
    type: SET_WHEN_NEEDED,
    data: list,
  }
}

export function setComing(list) {
  return {
    type: SET_COMING,
    data: list,
  }
}