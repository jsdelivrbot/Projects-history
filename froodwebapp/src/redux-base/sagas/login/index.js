/* eslint-disable no-constant-condition */
import { take, put, call, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  LOGIN,
  LOGOUT,
  loginSuccess
} from 'redux-base/actions';
import ApiToken from 'utils/apiHelpers/ApiToken';
import authorize from './authorize';

export default function* loginFlow() {
  // check cookies and try to autologin
  const apiToken = new ApiToken();
  apiToken.getFromCookie();
  const user = apiToken.getUser();
  const tokenExpired = apiToken.isExpired;

  if (user && !tokenExpired) {
    yield put(loginSuccess(user));
  }

  // run task in background
  yield fork(authorize);

  while (true) {
    // waint for failed login attempt or logoutRequest action
    const action = yield take([LOGIN.FAILURE, LOGOUT]);

    // if logoutRequest action performed - make redirection, remove cookie
    if (action.type === LOGOUT) {
      const token = new ApiToken();
      yield call(::token.removeCookie);

      yield put(push('/login'));
    }
  }
}
