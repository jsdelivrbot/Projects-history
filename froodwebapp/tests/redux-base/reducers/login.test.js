import login from 'redux-base/reducers/login';
import {
  LOGIN,
  LOGOUT
} from 'redux-base/actions/loginFlow';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('login reducer', () => {
  const initialState = {
    user: null,
  };
  it('handles GET_COMMON_DATA_REQUEST action type', () => {
    const action = {
      type: LOGIN.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loading = true;

    expect(login(initialState, action)).toEqual(state);
  });

  it('handles LOGIN_SUCCESS action type', () => {
    const action = {
      type: LOGIN.SUCCESS,
      user: 'user'
    };

    const state = cloneDeep(initialState);
    state.loading = false;
    state.user = action.user;

    expect(login(initialState, action)).toEqual(state);
  });

  it('handles LOGOUT action type', () => {
    const action = {
      type: LOGOUT
    };

    const state = cloneDeep(initialState);
    state.user = null;

    expect(login(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(login(initialState, {})).toEqual(initialState);
  });
});
