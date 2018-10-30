import authorize from 'redux-base/sagas/login/authorize';
import { call, put, take } from 'redux-saga/effects';
import ApiToken from 'utils/apiHelpers/ApiToken';
import apiRequest from 'redux-base/common/apiRequest';
import { LOGIN, loginSuccess } from 'redux-base/actions';

const { expect, describe, it } = global;

describe('authorize', () => {
  it('passes successfully', () => {
    const gen = authorize();
    const loginUrl = 'login';
    const user = {
      email: 'testuser118@gmail.com',
      password: '1234567'
    };
    const { email, password } = user;
    const apiToken = new ApiToken();
    const secondIterationResult = {
      error: 'some error',
      response: {
        data: ''
      }
    };
    let next = gen.next();

    expect(next.value).toEqual(take(LOGIN.REQUEST));

    next = gen.next(take(LOGIN.REQUEST));

    expect(JSON.stringify(next.value)).toEqual(JSON.stringify(call(apiRequest, apiClient => apiClient.post(loginUrl, { userName: email, password }))));

    next = gen.next(secondIterationResult);

    expect(next.value).toEqual(put(loginSuccess(null)));

    next = gen.next(secondIterationResult);

    expect(JSON.stringify(next.value)).toEqual(JSON.stringify(call(::apiToken.setCookie)));
  });
});
