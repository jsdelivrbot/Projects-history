
import { take, takeEvery, call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { hashHistory } from 'react-router-redux';
import 'whatwg-fetch';
import { push } from 'react-router-redux';
//import { getCookie } from '../utils/getCookie';
//import request from '../utils/api/request';
//import reqHeaders from '../../utils/api/headers';
import get from '../../utils/api/getMethods';
import { loginStatus, loadPrivileges, storeUserInfo, storePreviousState } from './actions';
import {
 CHECK_LOGIN_STATUS,
 NOT_LOGGED_IN,
 LOGGED_IN,
 LOAD_PRIVILEGES,
} from './constants';

import { makeSelectRoute, makeSelectAuthRequired } from './selectors';
import { getUser } from './authApi';

const url = process.env.CONFIG.apiUrl;

// Individual exports for testing
/** we take every CHECK_LOGIN_STATUS and LOGGED_IN action, and respond to them
* with checkStatus and privileges
*/
export function* authRootSaga() {
  console.log('authroot on');
  const statusWatcher = yield takeLatest(CHECK_LOGIN_STATUS, checkStatus);
  console.log('status watcher made');
  const privilegesWatcher = yield takeLatest(LOAD_PRIVILEGES, privileges);
  console.log('privileges put');
}

/*export function* initCheckLogin() {
  const status = yield takeLatest(CHECK_LOGIN_STATUS, checkStatus);
  //const privs = yield takeEvery(LOGGED_IN, privileges);
  console.log('AuthRequired saga kicking in');
}*/

//puts loginState which evaluates to LOGGED_IN on success
export function* checkStatus() {
  console.log('status checking working out');
  try {
    const userInfo = yield call(getUser);
    yield put(storeUserInfo(userInfo));
    console.log(userInfo);
    if (userInfo.loginState.loggedIn === false) {
      const location = yield select(makeSelectRoute());
      yield put(storePreviousState(location.locationBeforeTransitions));
      hashHistory.push('/login');
    }
    yield put(loginStatus(userInfo.loginState));
  } catch(error) {
    console.log('cannot get login state');
    console.log(error);
    yield put(push('/login'));
  }
}

//loads user privileges from server after loginStatus is verified
export function* privileges() {
  console.log('getting privileges');
 const privileges = yield call(get.userPrivileges);
 try {
  yield put(loadPrivileges(privileges));
 } catch(error) {
   console.log('cannot get privileges');
   console.log(error);
 }
}

// All sagas to be loaded
export default [
 authRootSaga,
];
