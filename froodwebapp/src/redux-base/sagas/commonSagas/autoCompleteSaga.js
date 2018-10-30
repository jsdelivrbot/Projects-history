/* eslint-disable new-cap, babel/new-cap, no-constant-condition */
import { put, call, throttle } from 'redux-saga/effects';
import { addParamsToURL } from 'utils';
import { showErrorMessage } from 'redux-base/actions';
import apiRequest from 'redux-base/common/apiRequest';
import { autocompleteActions } from 'redux-base/sagas/actionsHelper';

export function* autoCompleteSaga(filter) {
  if (filter.payload.length > 2) {
    const url = addParamsToURL(filter, filter.endpoint);
    const { response, error } = yield call(apiRequest, apiClient => apiClient.get(url));

    if (response) {
      const { data } = response;
      yield put(filter.successCb(data));
    } else {
      yield put(showErrorMessage(error));
    }
  }
}

export default function* throttleAutoCompleteSaga() {
  yield throttle(
    1000,
    autocompleteActions,
    autoCompleteSaga
  );
}
