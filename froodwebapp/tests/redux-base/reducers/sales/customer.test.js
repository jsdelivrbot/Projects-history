import customer from 'redux-base/reducers/sales/customer';
import {
  CUSTOMER_SAVE,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('customer', () => {
  const initialState = {
    loadingPage: false,
    data: null
  };

  it('handles CUSTOMER_SAVE_REQUEST action type', () => {
    const action = {
      type: CUSTOMER_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.loadingAutoComplete = false;
    state.successSave = false;

    expect(customer(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_SAVE_SUCCESS action type', () => {
    const action = {
      type: CUSTOMER_SAVE.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.data = action.data;

    expect(customer(initialState, action)).toEqual(state);
  });

  it('handles @@router/LOCATION_CHANGE action type', () => {
    const action = {
      type: '@@router/LOCATION_CHANGE'
    };

    expect(customer(initialState, action)).toEqual(initialState);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(customer(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(customer(initialState, {})).toEqual(initialState);
  });
});
