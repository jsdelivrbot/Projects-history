import getSaga from 'redux-base/sagas/commonSagas/getSaga';
import { call, take, put } from 'redux-saga/effects';
import { addParamsToURL } from 'utils';
import apiRequest from 'redux-base/common/apiRequest';
import { getActions } from 'redux-base/sagas/actionsHelper';

const { expect, describe, it } = global;

describe('getSaga', () => {
  it('passes successfully', () => {
    const gen = getSaga();
    const filter = {
      endpoint: 'static/values',
      responseType: 'GET_VALUES'
    };
    const firstIterationResult = {
      endpoint: 'Inventory',
      successCb(data) { return data; }
    };
    const getURL = addParamsToURL(filter, filter.endpoint);
    const secondIterationResult = {
      error: 'some error',
      response: {
        data: 'some response'
      }
    };
    let next = gen.next();

    expect(next.value).toEqual(take(getActions));

    next = gen.next(firstIterationResult);

    expect(JSON.stringify(next.value)).toEqual(JSON.stringify(call(apiRequest, apiClient => apiClient.get(getURL, { responseType: filter.responseType }))));

    next = gen.next(secondIterationResult);

    expect(next.value).toEqual(put(secondIterationResult.response.data));

    next = gen.next(secondIterationResult);

    expect(next.value).toEqual(take(getActions));
  });
});
