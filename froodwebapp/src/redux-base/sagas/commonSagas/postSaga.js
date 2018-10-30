/* eslint-disable new-cap, babel/new-cap, no-constant-condition, no-loop-func */
import { take, put, call } from 'redux-saga/effects';
import { addParamsToURL } from 'utils';
import { showErrorMessage } from 'redux-base/actions';
import apiRequest from 'redux-base/common/apiRequest';
import { postActions } from 'redux-base/sagas/actionsHelper';

export default function* postSaga() {
  while (true) {
    try {
      const filter = yield take(postActions);

      const getURL = addParamsToURL(filter, filter.endpoint);

      const { response, error } =
        yield call(apiRequest, apiClient => apiClient.post(getURL, filter.payload));

      if (response) {
        const { data } = response;
        yield put(filter.successCb(data));
      } else {
        yield put(showErrorMessage(error));
      }
    } catch (err) {
      yield put(showErrorMessage(err.message));
    }
  }
}
