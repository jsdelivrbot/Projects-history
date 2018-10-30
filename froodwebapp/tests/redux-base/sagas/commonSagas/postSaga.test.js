import postSaga from 'redux-base/sagas/commonSagas/postSaga';
import { call, take, put } from 'redux-saga/effects';
import { addParamsToURL } from 'utils';
import apiRequest from 'redux-base/common/apiRequest';
import { postActions } from 'redux-base/sagas/actionsHelper';

const { expect, describe, it } = global;

describe('postSaga', () => {
  it('passes successfully', () => {
    const gen = postSaga();
    const firstIterationResult = {
      endpoint: 'Inventory',
      successCb: data => data,
      payload: {
        type: 'Some action',
        data: 'Some data'
      }
    };
    const getURL = addParamsToURL(firstIterationResult, firstIterationResult.endpoint);
    const secondIterationResult = {
      error: 'some error',
      response: {
        data: 'some response'
      }
    };
    let next = gen.next();

    expect(next.value).toEqual(take(postActions));

    next = gen.next(firstIterationResult);

    expect(JSON.stringify(next.value)).toEqual(JSON.stringify(call(apiRequest, apiClient => apiClient.post(getURL, firstIterationResult.payload))));

    next = gen.next(secondIterationResult);

    expect(next.value).toEqual(put(secondIterationResult.response.data));

    next = gen.next(secondIterationResult);

    expect(next.value).toEqual(take(postActions));
  });
});
