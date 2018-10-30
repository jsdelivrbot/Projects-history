/* eslint-disable new-cap, babel/new-cap, no-constant-condition, no-useless-computed-key */
import { take, put, call, all } from 'redux-saga/effects';
import { addParamsToURL } from 'utils';
import { showErrorMessage } from 'redux-base/actions';
import apiRequest from 'redux-base/common/apiRequest';
import { parallelActions } from 'redux-base/sagas/actionsHelper';

export default function* getSagaParallel() {
  while (true) {
    try {
      const filter = yield take(parallelActions);

      const endpoints = [];

      filter.endpoints.forEach((endpoint, index) => {
        if (filter.params && filter.params[index]) {
          endpoints.push(addParamsToURL(filter.params[index], endpoint));
        } else {
          endpoints.push(endpoint);
        }
      });

      const requests = [];

      endpoints.forEach((endpoint) => {
        requests.push(
          call(apiRequest, apiClient => apiClient.get(endpoint)),
        );
      });

      const responses = yield all(requests);

      const error = responses.find(rs => rs.error !== undefined);

      if (!error) {
        const data = responses.map(rs => rs.response.data);

        yield put(filter.successCb(data));
      } else {
        yield put(showErrorMessage(error));
      }
    } catch (err) {
      yield put(showErrorMessage(err));
    }
  }
}
