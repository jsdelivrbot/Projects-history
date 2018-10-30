import apiRequest from 'redux-base/common/apiRequest';
import { call, select } from 'redux-saga/effects';
import ApiClient from 'utils/apiHelpers/ApiClient';

const { expect, describe, it } = global;

describe('apiRequest', () => {
  it('passes successfully', () => {
    const promise = jest.fn();
    const user = {
      token: 'X-TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW5jeUlkIjo0NywiaWF0IjoiMTUwNzgwNzY2OSIsImNvbXBhbnlO'
      + 'YW1lIjoiVGhlIE1lYXQgQ2x1YiIsImNvbXBhbnlJZCI6NywiY291bnRyeUlkIjo0NywibmFtZSI6InNhbmRlZXBAbm9vc3ludGVjaC5jb20iLC'
      + 'JhZG1pbiI6dHJ1ZSwiZXhwIjoiMTUzOTM0MzY2OSIsInVzZXJJZCI6NTl9.9ujXhaKYDP9x025IDGWxMjtvOHAPCTiQbeG4Lk354IQ'
    };

    const apiClient = new ApiClient();
    apiClient.getTokenFromState(user);

    const gen = apiRequest(promise);
    let next = gen.next();

    expect(JSON.stringify(next.value)).toEqual(JSON.stringify(select(state => state.login.user)));

    next = gen.next(user);

    expect(JSON.stringify(next.value)).toEqual(JSON.stringify(call(promise, apiClient)));

    next = gen.next();

    expect(next.done).toEqual(true);
  });
});
