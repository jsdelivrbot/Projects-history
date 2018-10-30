import { take, call, put, select } from 'redux-saga/effects';
import { getAllCustomerMeds, medById } from '../MedicationList/medicationListApi';
import { fetchMedicationListSuccess, setContinuous, setTemporary, setWhenNeeded, setComing } from './actions';
import { normalize, schema } from 'normalizr';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

export function* getAllMeds(action) {
  try {
    const medication = yield call(getAllCustomerMeds, action.id);
    yield put(setContinuous(filterMeds(medication, 'CONTINUOUS')));
    yield put(setTemporary(filterMeds(medication, 'TEMPORARY')));
    yield put(setWhenNeeded(filterMeds(medication, 'WHEN_NEEDED')));
    yield put(setComing(filterMeds(medication, 'COMING')));
    //console.log(continuous);
    yield put(fetchMedicationListSuccess(medication));
  } catch (error) {
    console.warn(error);
  }
}

export function filterMeds(array, params) {
  return array.filter((item) => {
    if (item.type === params) {
      return item;
    }
  });
}

// All sagas to be loaded
export default [
  defaultSaga,
];
