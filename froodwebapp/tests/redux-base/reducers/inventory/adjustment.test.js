import adjustment from 'redux-base/reducers/inventory/adjustment';
import {
  SKU_WAREHOUSE_BIN_GET,
  SKU_BATCHES_GET_WITH_FILTER,
  ADJUSTMENT_SAVE,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('adjustment reducer', () => {
  const initialState = {
    loadingPage: false,
    warehouses: [],
    bins: [],
    batches: []
  };

  it('handles SKU_WAREHOUSE_BIN_GET_REQUEST action type', () => {
    const action = {
      type: SKU_WAREHOUSE_BIN_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(adjustment(initialState, action)).toEqual(state);
  });

  it('handles SKU_BATCHES_GET_WITH_FILTER_REQUEST action type', () => {
    const action = {
      type: SKU_BATCHES_GET_WITH_FILTER.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(adjustment(initialState, action)).toEqual(state);
  });

  it('handles ADJUSTMENT_SAVE_REQUEST action type', () => {
    const action = {
      type: ADJUSTMENT_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(adjustment(initialState, action)).toEqual(state);
  });

  it('handles SKU_WAREHOUSE_BIN_GET_SUCCESS action type', () => {
    const action = {
      type: SKU_WAREHOUSE_BIN_GET.SUCCESS,
      data: {
        warehouses: 'warehouses',
        bins: 'bins'
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.warehouses = action.data.warehouses;
    state.bins = action.data.bins;

    expect(adjustment(initialState, action)).toEqual(state);
  });

  it('handles SKU_BATCHES_GET_WITH_FILTER_SUCCESS action type', () => {
    const action = {
      type: SKU_BATCHES_GET_WITH_FILTER.SUCCESS,
      data: {
        warehouses: 'warehouses',
        bins: 'bins'
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.batches = action.data;

    expect(adjustment(initialState, action)).toEqual(state);
  });

  it('handles ADJUSTMENT_SAVE_SUCCESS action type', () => {
    const action = {
      type: ADJUSTMENT_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(adjustment(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(adjustment(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(adjustment(initialState, {})).toEqual(initialState);
  });
});
