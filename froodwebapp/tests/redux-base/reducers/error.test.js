import error from 'redux-base/reducers/error';
import {
  ERROR,
  REMOVE_WARNING_NOTIFICATION,
  ADD_WARNING_NOTIFICATIONS
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('commonData reducer', () => {
  const initialState = {
    errorMessage: null,
    errorStatus: null,
    warningNotifications: []
  };

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR,
      data: {
        message: 'message',
        status: 'status'
      }
    };
    const state = cloneDeep(initialState);
    state.errorMessage = action.data.message;
    state.errorStatus = action.data.status;

    expect(error(initialState, action)).toEqual(state);
  });

  it('handles ADD_WARNING_NOTIFICATIONS action type', () => {
    const action = {
      type: ADD_WARNING_NOTIFICATIONS,
      notifications: 'notifications'
    };
    const state = cloneDeep(initialState);
    state.warningNotifications = [action.notifications];

    expect(error(initialState, action)).toEqual(state);
  });

  it('handles REMOVE_WARNING_NOTIFICATION action type', () => {
    const action = {
      type: REMOVE_WARNING_NOTIFICATION,
      notifications: 'notifications',
      id: 2
    };
    const state = cloneDeep(initialState);
    initialState.warningNotifications = [{ id: 2, value: 'notifications' }];

    expect(error(initialState, action)).toEqual(state);
    initialState.warningNotifications = [];
  });

  it('handles default case', () => {
    expect(error(initialState, {})).toEqual(initialState);
  });
});
