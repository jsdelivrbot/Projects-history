import stockCount from 'redux-base/reducers/inventory/stockCount';
import {
  STOCK_COUNT_WAREHOUSES_USERS_GET_PARALLEL,
  STOCK_COUNT_GET,
  STOCK_COUNT_SAVE,
  STOCK_COUNT_START_UPDATE,
  STOCK_COUNT_FINALIZE_UPDATE,
  STOCK_COUNT_DETAIL_CONFIRM_UPDATE,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('stockCount reducer', () => {
  const initialState = {
    users: [],
    warehouses: [],
    stockCount: {},
    loadingPage: false,
    needReload: false,
    needRedirect: false,
  };

  it('handles STOCK_COUNT_WAREHOUSES_USERS_GET_PARALLEL_REQUEST action type', () => {
    const action = {
      type: STOCK_COUNT_WAREHOUSES_USERS_GET_PARALLEL.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReload = false;
    state.needRedirect = false;

    expect(stockCount(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_GET_REQUEST action type', () => {
    const action = {
      type: STOCK_COUNT_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReload = false;
    state.needRedirect = false;

    expect(stockCount(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_SAVE_REQUEST action type', () => {
    const action = {
      type: STOCK_COUNT_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReload = false;
    state.needRedirect = false;

    expect(stockCount(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_START_UPDATE_REQUEST action type', () => {
    const action = {
      type: STOCK_COUNT_START_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReload = false;
    state.needRedirect = false;

    expect(stockCount(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_FINALIZE_UPDATE_REQUEST action type', () => {
    const action = {
      type: STOCK_COUNT_FINALIZE_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReload = false;
    state.needRedirect = false;

    expect(stockCount(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_DETAIL_CONFIRM_UPDATE_REQUEST action type', () => {
    const action = {
      type: STOCK_COUNT_DETAIL_CONFIRM_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReload = false;
    state.needRedirect = false;

    expect(stockCount(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_WAREHOUSES_USERS_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: STOCK_COUNT_WAREHOUSES_USERS_GET_PARALLEL.SUCCESS,
      data: ['users', 'warehouses']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.users = action.data[0];
    state.warehouses = action.data[1];

    expect(stockCount(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_GET_SUCCESS action type', () => {
    const action = {
      type: STOCK_COUNT_GET.SUCCESS,
      data: {
        assignedTo: 'user id',
        assignedToName: 'user.name',
        warehouseId: 'warehouse id',
        warehouseName: 'warehouse name'
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.stockCount = action.data;
    state.users = [{
      id: action.data.assignedTo,
      name: action.data.assignedToName
    }];
    state.warehouses = [{
      id: action.data.warehouseId,
      name: action.data.warehouseName,
    }];

    expect(stockCount(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_SAVE.SUCCESS action type', () => {
    const action = {
      type: STOCK_COUNT_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needRedirect = true;

    expect(stockCount(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_START_UPDATE_SUCCESS action type', () => {
    const action = {
      type: STOCK_COUNT_START_UPDATE.SUCCESS,
      data: {
        assignedTo: 'id',
        assignedToName: 'name',
        warehouseId: '1',
        warehouseName: 'name'
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needRedirect = false;
    state.stockCount = action.data;
    state.users = [{
      id: action.data.assignedTo,
      name: action.data.assignedToName
    }];
    state.warehouses = [{
      id: action.data.warehouseId,
      name: action.data.warehouseName,
    }];

    expect(stockCount(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_FINALIZE_UPDATE_SUCCESS action type', () => {
    const action = {
      type: STOCK_COUNT_FINALIZE_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needRedirect = true;

    expect(stockCount(initialState, action)).toEqual(state);
  });

  it('handles STOCK_COUNT_DETAIL_CONFIRM_UPDATE_SUCCESS action type', () => {
    const action = {
      type: STOCK_COUNT_DETAIL_CONFIRM_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReload = true;

    expect(stockCount(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(stockCount(initialState, action)).toEqual(state);
  });

  it('handles @@router/LOCATION_CHANGE action type', () => {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: ''
      }
    };

    expect(stockCount(initialState, action)).toEqual(initialState);
  });

  it('handles default action type', () => {
    expect(stockCount(initialState, {})).toEqual(initialState);
  });
});
