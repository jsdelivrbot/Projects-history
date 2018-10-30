import { take, call, put, select } from 'redux-saga/effects';
import { getMedicationDataset, getMedicationAtcDataset, getMedicationDatasetId } from './medicationApi';

// Individual exports for testing
export function* getMedicationListSaga(data) {
  // See example in containers/HomePage/sagas.js
  const { success, error } = data;
  try {
    const result = yield call(getMedicationDataset);
    yield put(success(result));
  } catch(err) {
    console.error(err);
    yield put(error);
  }
}

export function* getAtc(data) {
  const { success, error } = data;
  try {
    const result = yield call(getMedicationAtcDataset);
    yield put(success(result));
  } catch(err) {
    yield put(error);
  }
}

export function* getSingleMedication(data) {
  const { success, error } = data;
  try {
    const result = yield call(getMedicationDatasetId);
    yield put(success(result));
  } catch(err) {
    yield put(error);
  }
}

// All sagas to be loaded
export default [
  getMedicationListSaga,
];
