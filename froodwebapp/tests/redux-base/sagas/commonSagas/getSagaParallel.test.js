import { all, call, put, take } from 'redux-saga/effects';
import { addParamsToURL } from 'utils';
import getSagaParallel from 'redux-base/sagas/commonSagas/getSagaParallel';
import apiRequest from 'redux-base/common/apiRequest';
import { parallelActions } from 'redux-base/sagas/actionsHelper';

const { expect, describe, it } = global;

describe('getSagaParallel', () => {
  it('passes successfully', () => {
    const gen = getSagaParallel();
    const endpoints = [];
    const requests = [];
    const firstIterationResult = {
      endpoints: ['Inventory', 'Users'],
      successCb(data) { return data; }
    };

    firstIterationResult.endpoints.forEach((endpoint, index) => {
      if (firstIterationResult.params && firstIterationResult.params[index]) {
        endpoints.push(addParamsToURL(firstIterationResult.params[index], endpoint));
      } else {
        endpoints.push(endpoint);
      }
    });

    endpoints.forEach((endpoint) => {
      requests.push(
        call(apiRequest, apiClient => apiClient.get(endpoint)),
      );
    });

    const secondIterationResult = [{
      response: {
        data: 'some response'
      }
    }];
    let next = gen.next();

    expect(next.value).toEqual(take(parallelActions));

    next = gen.next(firstIterationResult);

    expect(JSON.stringify(next.value)).toEqual(JSON.stringify(all(requests)));

    next = gen.next(secondIterationResult);

    expect(next.value).toEqual(put([secondIterationResult[0].response.data]));

    next = gen.next(secondIterationResult);

    expect(next.value).toEqual(take(parallelActions));
  });
});
