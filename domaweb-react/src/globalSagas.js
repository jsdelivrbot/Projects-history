import { take, all, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { authRootSaga } from './sharedComponents/AuthRequired/sagas';
import { medicationRootSaga } from './MedicationList/containers/MedicationList/sagas';
import { getSymbols, submitReportWatcher } from './sharedComponents/AddReport/sagas';
import { reportDisplayRootSaga } from './sharedComponents/ReportDisplay/containers/ReportDisplay/sagas';
import { addTaskRootSaga } from './sharedComponents/AddTaskModal/sagas';

// Individual exports for testing
export function* globalRootSaga() {
  // ADD ALL GLOBAL SAGAS INSIDE YIELD
  yield [
    authRootSaga(),
    medicationRootSaga(),
    getSymbols(),
    submitReportWatcher(),
    reportDisplayRootSaga(),
    addTaskRootSaga(),
  ];
  //const globalWatcher = yield all([authRootSaga(), medicationRootSaga()]);
}

// All sagas to be loaded
export default [
  globalRootSaga,
];
