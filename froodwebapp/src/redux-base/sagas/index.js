/* eslint-disable no-constant-condition */
import { fork, take, cancel } from 'redux-saga/effects';
import {
  LOGIN,
  LOGOUT
} from 'redux-base/actions';

// login
import login from './login';

// common
import getSaga from './commonSagas/getSaga';
import getSagaParallel from './commonSagas/getSagaParallel';
import putSaga from './commonSagas/putSaga';
import postSaga from './commonSagas/postSaga';
import deleteSaga from './commonSagas/deleteSaga';
// eslint-disable-next-line
import autoCompleteSaga from './commonSagas/autoCompleteSaga';
import commonDataSaga from './commonSagas/commonDataSaga';

export default function* root() {
  yield fork(login);

  while (true) {
    yield take(LOGIN.SUCCESS);

    const sagas = yield [
      fork(commonDataSaga),
      fork(getSaga),
      fork(getSagaParallel),
      fork(putSaga),
      fork(postSaga),
      fork(deleteSaga),
      fork(autoCompleteSaga),
    ];

    yield take(LOGOUT);

    yield sagas.forEach(saga => cancel(saga));
  }
}
