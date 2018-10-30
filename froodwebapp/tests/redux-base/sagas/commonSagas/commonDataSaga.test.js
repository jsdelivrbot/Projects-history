import commonDataSaga from 'redux-base/sagas/commonSagas/commonDataSaga';
import { call, put } from 'redux-saga/effects';
import apiRequest from 'redux-base/common/apiRequest';
import {
  commonDataRequest,
  commonDataSuccess,
} from 'redux-base/actions';

const { expect, describe, it } = global;

describe('commonDataSaga', () => {
  it('passes successfully', () => {
    const gen = commonDataSaga();
    const endpoint = '/v1/static/values/';
    const secondIterationResult = {
      error: 'Some Error',
      response: {
        data: 'Some Response'
      }
    };
    let next = gen.next();

    expect(next.value).toEqual(put(commonDataRequest()));

    next = gen.next(commonDataRequest());

    expect(JSON.stringify(next.value)).toEqual(JSON.stringify(call(apiRequest, apiClient => apiClient.get(endpoint))));

    next = gen.next(secondIterationResult);

    expect(next.value).toEqual(put(commonDataSuccess(secondIterationResult.response.data)));

    next = gen.next();

    expect(next.done).toEqual(true);
  });
});
