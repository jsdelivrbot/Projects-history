import { take, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { INIT_MEDICATION_LIST } from './constants'
import { medListViewSaga, toggleTabsSaga, toggleAddNewModalSaga } from '../MedListView/sagas'
import { TOGGLE_MED_VIEW, TOGGLE_TABS, TOGGLE_ADD_NEW_MODAL } from '../MedListView/constants';
import { getAllCustomerMeds } from './medicationListApi';
import { getAllMeds } from '../CustomerMedication/sagas';
import { defaultMedicationSaga, testSaga, addNewMedicationRootSaga } from '../AddNewMedication/sagas';
import { GET_MEDICATION_LIST, TEST, } from '../AddNewMedication/constants';
// Individual exports for testing
export function* medicationRootSaga() {
  // See example in containers/HomePage/sagas.js
  console.log('medication saga');
  const modalStateWatcher = yield takeEvery(TOGGLE_MED_VIEW, medListViewSaga);
  console.log('modalstatewatcher');
  const toggleTabsWatcher = yield takeEvery(TOGGLE_TABS, toggleTabsSaga);
  const addNewModalWatcher = yield takeEvery(TOGGLE_ADD_NEW_MODAL, toggleAddNewModalSaga);
  const initWatcher = yield takeLatest(INIT_MEDICATION_LIST, getAllMeds);
  const getMedListWatcher = yield takeLatest(TOGGLE_MED_VIEW, defaultMedicationSaga);
  const testWatcher = yield takeEvery(TEST, testSaga);
  yield addNewMedicationRootSaga();
}

// All sagas to be loaded
export default [
  medicationRootSaga,
];
