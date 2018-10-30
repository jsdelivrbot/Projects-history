import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';


const { describe, it, expect } = global;

describe('createRequestTypes', () => {
  it('returns object with request type string constants', () => {
    const base = 'CATEGORY';
    const res = {
      FAILURE: 'CATEGORY_FAILURE',
      REQUEST: 'CATEGORY_REQUEST',
      SUCCESS: 'CATEGORY_SUCCESS'
    };

    expect(createRequestTypes(base)).toEqual(res);
  });
});

describe('createRequestFunc', () => {
  it('returns correct action payload', () => {
    const TEST = createRequestTypes('TEST');

    const endpoint = '/v1/category/';
    const responseType = 'JSON';

    const payload = {
      payload: {
        id: 5
      }
    };

    const testRequestFunction = createRequestFunc(TEST, endpoint, responseType);
    const result = testRequestFunction(payload);

    const expectedResult = {
      payload: { id: 5 },
      endpoint: '/v1/category/',
      responseType: 'JSON',
      type: 'TEST_REQUEST',
    };

    // delete testRequestFunction.successCb;

    expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedResult));
  });
});

describe('createParallelRequestFunc', () => {
  it('handles all params', () => {
    const actionType = {
      FAILURE: 'CATEGORY_FAILURE',
      REQUEST: 'CATEGORY_REQUEST',
      SUCCESS: 'CATEGORY_SUCCESS'
    };
    const endpoints = ['/v1/category/', '/v1/settings/system/taxes/new'];
    const data = 'some simple data';
    const props = { data };
    const returnedParallelFunc = createParallelRequestFunc(actionType, endpoints)(props);
    const res = {
      data,
      endpoints,
      responseType: 'json',
      type: actionType.REQUEST
    };

    delete returnedParallelFunc.successCb;

    expect(returnedParallelFunc).toEqual(res);
  });
});
