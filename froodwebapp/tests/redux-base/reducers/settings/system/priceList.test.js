import priceList from 'redux-base/reducers/settings/system/priceList';
import {
  PRICE_LIST_GET,
  PRICE_LIST_SAVE,
  PRICE_LIST_UPDATE,
  PRICE_LIST_SKU_SAVE,
  PRICE_LIST_SKU_UPDATE,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('priceList reducer', () => {
  const initialState = {
    priceListSKUs: [],
    priceList: {
      type: 1,
      isTaxIncl: true
    },
    loadingPage: false
  };

  it('handles PRICE_LIST_GET_REQUEST action type', () => {
    const action = {
      type: PRICE_LIST_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(priceList(initialState, action)).toEqual(state);
  });

  it('handles PRICE_LIST_SAVE_REQUEST action type', () => {
    const action = {
      type: PRICE_LIST_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(priceList(initialState, action)).toEqual(state);
  });

  it('handles PRICE_LIST_UPDATE_REQUEST action type', () => {
    const action = {
      type: PRICE_LIST_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(priceList(initialState, action)).toEqual(state);
  });

  it('handles PRICE_LIST_SKU_SAVE_REQUEST action type', () => {
    const action = {
      type: PRICE_LIST_SKU_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(priceList(initialState, action)).toEqual(state);
  });

  it('handles PRICE_LIST_SKU_UPDATE_REQUEST action type', () => {
    const action = {
      type: PRICE_LIST_SKU_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(priceList(initialState, action)).toEqual(state);
  });

  it('handles PRICE_LIST_GET_SUCCESS action type', () => {
    const action = {
      type: PRICE_LIST_GET.SUCCESS,
      data: {
        list: 'Some Data'
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.priceList = action.data;
    state.priceListSKUs = action.data.list;

    expect(priceList(initialState, action)).toEqual(state);
  });

  it('handles PRICE_LIST_SAVE_SUCCESS action type', () => {
    const action = {
      type: PRICE_LIST_SAVE.SUCCESS,
      data: {
        list: 'Some Data'
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.priceList = action.data;
    state.priceListSKUs = action.data.list;

    expect(priceList(initialState, action)).toEqual(state);
  });

  it('handles PRICE_LIST_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PRICE_LIST_UPDATE.SUCCESS,
      data: {
        list: 'Some Data'
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.priceList = action.data;
    state.priceListSKUs = action.data.list;

    expect(priceList(initialState, action)).toEqual(state);
  });

  it('handles PRICE_LIST_SKU_SAVE_SUCCESS action type', () => {
    const action = {
      type: PRICE_LIST_SKU_SAVE.SUCCESS,
      data: {
        list: 'Some Data'
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.priceListSKUs = [action.data];

    expect(priceList(initialState, action)).toEqual(state);
  });

  it('handles PRICE_LIST_SKU_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PRICE_LIST_SKU_UPDATE.SUCCESS,
      data: {
        id: '2',
        data: 'Some Data'
      }
    };
    initialState.priceListSKUs = [{
      id: '2',
      data: 'Initial Some Data'
    }, {
      id: '3',
      data: 'Initial Some Data without id'
    }];

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.priceListSKUs = [action.data, initialState.priceListSKUs[1]];

    expect(priceList(initialState, action)).toEqual(state);
    initialState.priceListSKUs = [];
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(priceList(initialState, action)).toEqual(state);
  });

  it('handles @@router/LOCATION_CHANGE action type', () => {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: ''
      }
    };

    expect(priceList(initialState, action)).toEqual(initialState);
  });

  it('handles default case', () => {
    expect(priceList(initialState, {})).toEqual(initialState);
  });
});
