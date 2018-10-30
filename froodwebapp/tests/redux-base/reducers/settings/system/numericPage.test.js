import numeric from 'redux-base/reducers/settings/system/numericPage';
import { NUMERIC_SAVE } from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('numeric reducer', () => {
  const initialState = {
    data: [],
    loading: false
  };

  it('handles NUMERIC_SAVE_REQUEST action type', () => {
    const action = {
      type: NUMERIC_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loading = true;

    expect(numeric(initialState, action)).toEqual(state);
  });

  it('handles NUMERIC_SAVE_SUCCESS action type', () => {
    const action = {
      type: NUMERIC_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loading = false;
    state.successMessage = 'Saved';
    state.errorMessage = null;

    expect(numeric(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(numeric(initialState, {})).toEqual(initialState);
  });
});
