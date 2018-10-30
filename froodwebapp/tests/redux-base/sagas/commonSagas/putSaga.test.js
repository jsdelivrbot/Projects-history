import putSaga from 'redux-base/sagas/commonSagas/putSaga';
import { call, put ,take } from 'redux-saga/effects';
import { addParamsToURL } from 'utils';
import apiRequest from 'redux-base/common/apiRequest';
import { putActions } from 'redux-base/sagas/actionsHelper';

const { expect, describe, it } = global;

describe('putSaga', () => {
  it('passes successfully', () => {
    const gen = putSaga();
    const firstIterationResult = {
      endpoint: 'Inventory',
      successCb(data) { return data; },
      payload: {
        type: 'Some action',
        data: 'Some data'
      }
    };
    const endpoint = addParamsToURL(firstIterationResult, firstIterationResult.endpoint);
    const secondIterationResult = {
      error: 'some error',
      response: {
        data: 'some response'
      }
    };
    let next = gen.next();

    expect(next.value).toEqual(take(putActions));

    next = gen.next(firstIterationResult);

    expect(JSON.stringify(next.value)).toEqual(JSON.stringify(call(apiRequest, apiClient => apiClient.put(endpoint, firstIterationResult.payload))));

    next = gen.next(secondIterationResult);

    expect(next.value).toEqual(put(secondIterationResult.response.data));

    next = gen.next(secondIterationResult);

    expect(next.value).toEqual(take(putActions));
  });
});
