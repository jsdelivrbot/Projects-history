import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { DEFAULT_ACTION } from './constants';
import { logout } from './logoutApi';
import { hashHistory } from 'react-router';
import { push } from 'react-router-redux';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  const logoutUserWatcher = yield takeEvery(DEFAULT_ACTION, logoutUser);
}

export function* logoutUser() {
  try {
    const response = yield call(logout);
    yield delay(300);
    yield put(push('/login'));
  } catch (error) {
    console.error(error);
  }
}
// All sagas to be loaded
export default [
  defaultSaga,
];
