import priceLists from 'redux-base/reducers/settings/system/priceLists';
import {
  PRICE_LISTS_GET,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('priceLists reducer', () => {
  const initialState = {
    priceLists: [],
    loadingPage: false
  };

  it('handles PRICE_LISTS_GET_REQUEST action type', () => {
    const action = {
      type: PRICE_LISTS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(priceLists(initialState, action)).toEqual(state);
  });

  it('handles PRICE_LISTS_GET_SUCCESS action type', () => {
    const action = {
      type: PRICE_LISTS_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.priceLists = action.data;

    expect(priceLists(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(priceLists(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(priceLists(initialState, {})).toEqual(initialState);
  });
});
