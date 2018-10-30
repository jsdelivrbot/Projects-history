import autocomplete from 'redux-base/reducers/autocomplete';
import {
  SKU_SEARCH,
  SKU_SEARCH_BY_VENDOR,
  BUNDLE_SEARCH,
  CUSTOMER_SEARCH,
  CUSTOMER_ORDERS_SEARCH,
  SUPPLIER_SEARCH,
  SKU_WAREHOUSE_INFO_GET
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('autocomplete reducer', () => {
  const initialState = {
    loadingAutoComplete: false,
    skus: [],
    bundles: [],
    customers: [],
    customerOrders: [],
    suppliers: [],
    gridRowId: null,
    skuWarehouseInfo: {}
  };

  it('handles SKU_SEARCH_REQUEST action type', () => {
    const action = {
      type: SKU_SEARCH.REQUEST,
      payload: []
    };

    const state = cloneDeep(initialState);
    state.loadingAutoComplete = false;
    state.skus = [];

    expect(autocomplete(initialState, action)).toEqual(state);
  });

  it('handles SKU_SEARCH_BY_VENDOR_REQUEST action type', () => {
    const action = {
      type: SKU_SEARCH_BY_VENDOR.REQUEST,
      payload: []
    };

    const state = cloneDeep(initialState);
    state.loadingAutoComplete = false;
    state.skus = [];

    expect(autocomplete(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_SEARCH_REQUEST action type', () => {
    const action = {
      type: BUNDLE_SEARCH.REQUEST,
      payload: []
    };

    const state = cloneDeep(initialState);
    state.loadingAutoComplete = false;
    state.bundles = [];

    expect(autocomplete(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_SEARCH_REQUEST action type', () => {
    const action = {
      type: CUSTOMER_SEARCH.REQUEST,
      payload: []
    };

    const state = cloneDeep(initialState);
    state.loadingAutoComplete = false;
    state.customers = [];

    expect(autocomplete(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ORDERS_SEARCH_REQUEST action type', () => {
    const action = {
      type: CUSTOMER_ORDERS_SEARCH.REQUEST,
      payload: []
    };

    const state = cloneDeep(initialState);
    state.loadingAutoComplete = false;
    state.customerOrders = [];

    expect(autocomplete(initialState, action)).toEqual(state);
  });

  it('handles SUPPLIER_SEARCH_REQUEST action type', () => {
    const action = {
      type: SUPPLIER_SEARCH.REQUEST,
      payload: []
    };

    const state = cloneDeep(initialState);
    state.loadingAutoComplete = false;
    state.suppliers = [];

    expect(autocomplete(initialState, action)).toEqual(state);
  });

  it('handles SKU_SEARCH_SUCCESS action type', () => {
    const action = {
      type: SKU_SEARCH.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingAutoComplete = false;
    state.skus = action.data;

    expect(autocomplete(initialState, action)).toEqual(state);
  });

  it('handles SKU_SEARCH_BY_VENDOR_SUCCESS action type', () => {
    const action = {
      type: SKU_SEARCH_BY_VENDOR.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingAutoComplete = false;
    state.skus = action.data;

    expect(autocomplete(initialState, action)).toEqual(state);
  });

  it('handles SKU_WAREHOUSE_INFO_GET_REQUEST action type', () => {
    const action = {
      type: SKU_WAREHOUSE_INFO_GET.REQUEST,
      gridRowId: '1'
    };

    const state = cloneDeep(initialState);
    state.gridRowId = action.gridRowId;
    state.skuWarehouseInfo = {};

    expect(autocomplete(initialState, action)).toEqual(state);
  });

  it('handles SUPPLIER_SEARCH_SUCCESS action type', () => {
    const action = {
      type: SUPPLIER_SEARCH.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingAutoComplete = false;
    state.suppliers = action.data;

    expect(autocomplete(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_SEARCH_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_SEARCH.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingAutoComplete = false;
    state.bundles = action.data;

    expect(autocomplete(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_SEARCH_SUCCESS action type', () => {
    const action = {
      type: CUSTOMER_SEARCH.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingAutoComplete = false;
    state.customers = action.data;

    expect(autocomplete(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ORDERS_SEARCH_SUCCESS action type', () => {
    const action = {
      type: CUSTOMER_ORDERS_SEARCH.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingAutoComplete = false;
    state.customerOrders = action.data;

    expect(autocomplete(initialState, action)).toEqual(state);
  });

  it('handles SKU_WAREHOUSE_INFO_GET_SUCCESS action type', () => {
    const action = {
      type: SKU_WAREHOUSE_INFO_GET.SUCCESS,
      data: [{
        id: '1',
        skuName: 'sku',
        vendorSku: 'vendor',
        vendorSkuName: 'vendor sky',
        availableQuantity: 20,
        uomName: 'uom',
        taxRate: 1,
        unitPrice: 45
      }]
    };

    const state = cloneDeep(initialState);
    state.skuWarehouseInfo = {
      id: action.data[0].id,
      skuName: action.data[0].skuName,
      vendorSku: action.data[0].vendorSku,
      vendorSkuName: action.data[0].vendorSkuName,
      availableQuantity: action.data[0].availableQuantity,
      uomName: action.data[0].uomName,
      taxRate: action.data[0].taxRate,
      unitPrice: action.data[0].unitPrice
    };

    expect(autocomplete(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(autocomplete(initialState, {})).toEqual(initialState);
  });
});
