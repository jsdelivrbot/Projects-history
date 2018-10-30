import { take, takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { hashHistory } from 'react-router';

import {getFormatedDate} from '../../../utils/dateUtil';

import {
  sessionInfo, formatState, setPhase, setStep,
  registerSrpStep1, registerSrpStep2, registerSrpStep3, loginSrpStep1,
  loginSrpStep2, userCredentials, initLogin, fetchUserState, redirect,
  loginError,
  loginErrorDismiss,
} from './actions';

import { loginStatus } from '../../../sharedComponents/AuthRequired/actions';

import {
  FORMAT_STATE, INIT_REGISTER, REGISTER_SRP_STEP1,
  REGISTER_SRP_STEP2, REGISTER_SRP_STEP3, LOGIN_SRP_STEP1,
  LOGIN_SRP_STEP2, INIT_LOGIN, LOGOUT, FETCH_USER_STATE, REDIRECT,
} from './constants';

import post, { get } from './loginApi';
import SRPClient from '../../../utils/thinbus-srp/thinbus-srp6client-sha256';
import makeSelectLogin, { makeSelectRoute } from './selectors';
import makeSelectAuthRequired from '../../../sharedComponents/AuthRequired/selectors';
import { taskRedirect } from '../../../utils/routeUtil';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  const userState = yield takeEvery(FETCH_USER_STATE, getUserInfo);
  const redirectWatcher = yield takeLatest(REDIRECT, redirectAfterLogin);
  console.log('default saga kicked in');
  /*const userInfo = yield call(get.user);
  yield put(sessionInfo(userInfo));*/
  //const test = yield select(makeSelectLogin());
  //console.log(test);
  //yield put(formatState());
}

export function* getUserInfo() {
  try {
    const userInfo = yield call(get.user);
    yield put(loginStatus(userInfo.loginState));
    console.log(userInfo);
    if (userInfo.loginState.loggedIn) {
      yield put(redirect());
    } else {
      yield put(sessionInfo(userInfo));
    }
  } catch (error) {
    yield put(loginError(error));
  }
}

export function* formatLogin() {
  while (true) {
    const format = yield take(FORMAT_STATE);
    console.log('formatting state from saga');
    yield put(setPhase(0));
    yield put(setStep(0));
  }
}

export function* initPhoneRegister() {
  while (true) {
    const data = yield take(INIT_REGISTER);
    console.log('took srp1');
    console.log(data);
    yield put(userCredentials({
      identity: data.credentials.userName,
      phoneNumber: data.credentials.phoneNumber
    }));
    const credentials = {
      identity: data.credentials.userName,
      phoneNumber: data.credentials.phoneNumber,
      implementation: 'THINBUS',
    }
    console.log(credentials);
    try {
      const response = yield call(post.domawebRegisterPhone, credentials);
      yield put(registerSrpStep1({resp: response, info: data}));
    } catch (error) {
      console.log(error);
      yield put(loginError(error));
    }
  }
}

export function* registerSRP1() {
  while (true) {
    const response = yield take(REGISTER_SRP_STEP1);
    yield put (setStep(1));
    console.log(response);
    const srpcli = new SRPClient({
      N_base10: response.data.resp.nstr,
      g_base10: response.data.resp.gstr,
      k_base16: response.data.resp.kstr,
    });
    srpcli.step1(response.data.info.credentials.userName, response.data.info.credentials.password);
    const srpCreds = srpcli.step2(response.data.resp.sstr, response.data.resp.bstr);
    console.log(srpcli);
    console.log(srpCreds);
    yield put(registerSrpStep2({creds: srpCreds, phoneNumber: response.data.info.credentials.phoneNumber}));
  }
}

export function* registerSRP2() {
  while (true) {
    const srpCreds = yield take(REGISTER_SRP_STEP2);
    console.log(JSON.stringify(srpCreds));
    const payload = {
      astr: srpCreds.data.creds.A,
      m1str: srpCreds.data.creds.M1,
      phoneNumber: srpCreds.data.phoneNumber,
      implementation: 'THINBUS',
    };
    try {
      const response = yield call(post.domawebRegisterStep2, payload);
      console.log(response);
      yield put(setStep(2));
    } catch(error) {
      yield put(loginError(error));
      yield put(setStep(null));
    }
  }
  // yield put(loginError(error));
}

export function* registerSRP3() {
  while (true) {
    const payload = yield take(REGISTER_SRP_STEP3);
    yield put(loginErrorDismiss());
    // console.log(payload);
    const state = yield select(makeSelectLogin());
    const credentials = {
      token: payload.data.token,
      phoneNumber: state.user.phoneNumber
    };
    console.log(credentials);
    try {
      const response = yield call(post.domawebRegisterStep3, credentials);
      // console.log(response);
      yield put(fetchUserState());
      // yield put(setStep(3));
    } catch (error) {
      console.log('SMS VERIFICATION ERROR', error);
      yield put(loginError(error));
      // yield put(setStep(null));
    }
  }
}

export function* startLogin() {
  while (true) {
    const data = yield take(INIT_LOGIN);
    console.log('took srp1');
    console.log(data);
    yield put(userCredentials({
      identity: data.credentials.userName,
      phoneNumber: data.credentials.phoneNumber
    }));
    const state = yield select(makeSelectLogin());
    console.log(state);
    const credentials = {
      identity: data.credentials.userName,
      phoneNumber: data.credentials.phoneNumber,
      implementation: 'THINBUS',
      db: state.session.registeredDbs[0],
    }
    console.log(credentials);
    try {
      const response = yield call(post.loginDomauser, credentials);
      yield put(loginSrpStep1({resp: response, info: data}));
    } catch (error) {
      console.log(error);
      yield put(loginError(error));
    }
  }
}

export function* loginSRP1() {
  while (true) {
    const response = yield take(LOGIN_SRP_STEP1);
    console.log(response);
    const srpcli = new SRPClient({
      N_base10: response.data.resp.nstr,
      g_base10: response.data.resp.gstr,
      k_base16: response.data.resp.kstr,
    });
    srpcli.step1(response.data.info.credentials.userName, response.data.info.credentials.password);
    const srpCreds = srpcli.step2(response.data.resp.sstr, response.data.resp.bstr);
    console.log(srpcli);
    console.log(srpCreds);
    yield put(loginSrpStep2({creds: srpCreds, phoneNumber: response.data.info.credentials.phoneNumber}));
  }
}

export function* loginSRP2() {
  while (true) {
    const srpCreds = yield take(LOGIN_SRP_STEP2);
    console.log(JSON.stringify(srpCreds));
    const payload = {
      astr: srpCreds.data.creds.A,
      m1str: srpCreds.data.creds.M1,
      phoneNumber: srpCreds.data.phoneNumber,
      implementation: 'THINBUS',
    };
    try {
      const response = yield call(post.loginDomauserStep2, payload);
      console.log(response);
      yield put(fetchUserState());
    } catch (error) {
      console.log(error);
      yield put(loginError(error));
    }
  }

}

export function* logout() {
  yield takeEvery(LOGOUT, postAndFetch);
  //yield call(post.logout);
  //yield put(fetchUserState());
}

export function* postAndFetch() {
  yield call(post.logout);
  yield put(fetchUserState());
}

export function* redirectAfterLogin() {
  console.log('redirecting because already logged in');
  const route = yield select(makeSelectRoute());
  console.log(route);
  const auth = yield select(makeSelectAuthRequired());
  const { previousState } = auth;
  //yield delay(600);
  if (!previousState || previousState.pathname === '/login' || previousState.pathname === '/logout') {
    console.log('redirecting to main state');
    hashHistory.push(`${taskRedirect()}`);
  } else {
    console.log('redirecting to previous state');
    hashHistory.push(previousState.pathname);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
  formatLogin,
  initPhoneRegister,
  registerSRP1,
  registerSRP2,
  registerSRP3,
  startLogin,
  loginSRP1,
  loginSRP2,
  logout,
];
