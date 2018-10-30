import deleteSaga from 'redux-base/sagas/commonSagas/deleteSaga';
import { take, put, call } from 'redux-saga/effects';
import { addParamsToURL } from 'utils';
import apiRequest from 'redux-base/common/apiRequest';
import { deleteActions } from 'redux-base/sagas/actionsHelper';

const { expect, describe, it } = global;

describe('deleteSaga', () => {
  it('passes successfully', () => {
    const gen = deleteSaga();
    const firstIterationResult = {
      endpoint: 'Inventory',
      successCb(data) { return data; },
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

    expect(next.value).toEqual(take(deleteActions));

    next = gen.next(firstIterationResult);

    expect(JSON.stringify(next.value)).toEqual(JSON.stringify(call(apiRequest, apiClient => apiClient.delete(getURL, firstIterationResult.payload))));

    next = gen.next(secondIterationResult);

    expect(next.value).toEqual(put(secondIterationResult.response.data));

    next = gen.next();

    expect(next.value).toEqual(take(deleteActions));
  });
});
