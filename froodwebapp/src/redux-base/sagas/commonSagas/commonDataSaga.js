/* eslint-disable new-cap, babel/new-cap, no-constant-condition, no-useless-computed-key */
import { put, call } from 'redux-saga/effects';
import {
  showErrorMessage,
  commonDataRequest,
  commonDataSuccess,
} from 'redux-base/actions';

import apiRequest from 'redux-base/common/apiRequest';

export default function* commonDataSaga() {
  try {
    yield put(commonDataRequest());

    const endpoint = 'static/values';

    const { response, error } =
      yield call(apiRequest, apiClient => apiClient.get(endpoint));

    if (response) {
      const { data } = response;
      yield put(commonDataSuccess(data));
    } else {
      yield put(showErrorMessage(error));
    }
  } catch (err) {
    yield put(showErrorMessage(err.message));
  }
}
