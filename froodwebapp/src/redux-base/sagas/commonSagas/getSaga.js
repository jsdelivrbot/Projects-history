/* eslint-disable new-cap, babel/new-cap, no-constant-condition */
import { take, put, call } from 'redux-saga/effects';
import { addParamsToURL } from 'utils';
import { showErrorMessage } from 'redux-base/actions';
import apiRequest from 'redux-base/common/apiRequest';
import { getActions } from 'redux-base/sagas/actionsHelper';

export default function* getSaga() {
  while (true) {
    try {
      const filter = yield take(getActions);
      const getURL = addParamsToURL(filter, filter.endpoint);

      const { response, error } =
        yield call(apiRequest, apiClient => apiClient.get(getURL, { responseType: filter.responseType }));

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
