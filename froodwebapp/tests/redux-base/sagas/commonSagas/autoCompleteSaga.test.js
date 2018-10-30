import { autoCompleteSaga } from 'redux-base/sagas/commonSagas/autoCompleteSaga';
import { addParamsToURL } from 'utils';
import { call, put } from 'redux-saga/effects';
import apiRequest from 'redux-base/common/apiRequest';
import { autocompleteActions } from 'redux-base/sagas/actionsHelper';

const { expect, describe, it } = global;

describe('autoCompleteSaga', () => {
  it('passes successfully', () => {
    const filter = {
      payload: autocompleteActions,
      endpoint: '/v1/static/values/',
      successCb(data) { return data; }
    };
    const url = addParamsToURL(filter, filter.endpoint);
    const gen = autoCompleteSaga(filter);
    const secondIterationResult = {
      error: 'some error',
      response: {
        data: 'some response'
      }
    };
    let next = gen.next();

    expect(JSON.stringify(next.value)).toEqual(JSON.stringify(call(apiRequest, apiClient => apiClient.get(url))));

    next = gen.next(secondIterationResult);

    expect(next.value).toEqual(put(secondIterationResult.response.data));

    next = gen.next();

    expect(next.done).toEqual(true);
  });
});
