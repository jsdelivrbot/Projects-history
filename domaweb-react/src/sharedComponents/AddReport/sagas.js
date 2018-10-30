import { takeEvery, call, put } from 'redux-saga/effects';
import API from './api';

import {
  LOAD_SYMBOLS, LOAD_SYMBOLS_SUCESS, LOAD_SYMBOLS_FAILED,
  SUMBIT_REPORT, SUMBIT_REPORT_SUCESS, SUMBIT_REPORT_FAILED,
} from './constants';

// Fetch symbols list
export function* symbolsList() {
  try {
    const symbols = yield call(API.getSymbols);
    if (symbols) {
      yield put({ type: LOAD_SYMBOLS_SUCESS, symbols });
    }
  } catch (errormsg) {
    yield put({ type: LOAD_SYMBOLS_FAILED, errormsg });
  }
}

export function* getSymbols() {
  yield takeEvery(LOAD_SYMBOLS, symbolsList);
}

export function* submitReport(action) {

  const payload = {
      "customerId" : 30878,
      "eventTime" : "2018-03-07T13:15:00",
      "status" : "finished",
      "taskId" :"335350",
      "symbolSelections" : [ {
        "symbol" : {
          "id" : 294,
          "value" : "asd",
          "parentId" : 1,
          "displayName" : "",
          "reportName" : "",
          "type" : "text",
          "orderIndex" : 9
        },
      }, {
        "symbol" : {
          "id" : 15,
          "parentId" : 14,
          "displayName" : "Itsenäisesti",
          "reportName" : "Itsenäisesti",
          "type" : "select",
          "orderIndex" : 0
        }
      } ]
    }
  try {
    console.log(action);
    const submited = yield call(API.postReport, action.customerId, payload);
    //const submited = yield call(API.postReport, action.customerId, action.payload);
    if (submited) {
      yield put({ type: SUMBIT_REPORT_SUCESS });
    }
  } catch (errormsg) {
    yield put({ type: SUMBIT_REPORT_FAILED, errormsg });
  }
}

export function* submitReportWatcher() {
  const action = yield takeEvery(SUMBIT_REPORT, submitReport);
}


// All sagas to be loaded
export default [
  getSymbols,
  submitReportWatcher,
];
