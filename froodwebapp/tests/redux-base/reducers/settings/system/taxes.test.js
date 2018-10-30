import taxes from 'redux-base/reducers/settings/system/taxes';
import {
  TAX_CODES_GET,
  TAX_CATEGORIES_GET_PARALLEL,
  TAX_CODES_SAVE,
  TAX_CATEGORIES_SAVE,
  TAX_CODES_UPDATE,
  TAX_CATEGORIES_UPDATE,
  TAX_CODES_DELETE,
  TAX_CATEGORIES_DELETE,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('taxes reducer', () => {
  const initialState = {
    taxCodes: [],
    taxCategories: [],
    loadingPage: false,
    needReloadTaxCodes: false,
    needReloadTaxCategories: false,
  };

  it('handles LOCATIONS_INFO_UPDATE_REQUEST action type', () => {
    const action = {
      type: TAX_CODES_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CODES_GET_REQUEST action type', () => {
    const action = {
      type: TAX_CODES_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CATEGORIES_UPDATE_REQUEST action type', () => {
    const action = {
      type: TAX_CATEGORIES_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CODES_SAVE_REQUEST action type', () => {
    const action = {
      type: TAX_CODES_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CATEGORIES_SAVE_REQUEST action type', () => {
    const action = {
      type: TAX_CATEGORIES_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CATEGORIES_GET_PARALLEL_REQUEST action type', () => {
    const action = {
      type: TAX_CATEGORIES_GET_PARALLEL.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CODES_DELETE_REQUEST action type', () => {
    const action = {
      type: TAX_CODES_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CODES_GET_SUCCESS action type', () => {
    const action = {
      type: TAX_CODES_GET.SUCCESS,
      data: 'Some DATA'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadTaxCodes = false;
    state.taxCodes = action.data;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CODES_SAVE_SUCCESS action type', () => {
    const action = {
      type: TAX_CODES_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadTaxCodes = true;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CODES_UPDATE_SUCCESS action type', () => {
    const action = {
      type: TAX_CODES_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadTaxCodes = true;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CODES_DELETE_SUCCESS action type', () => {
    const action = {
      type: TAX_CODES_DELETE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadTaxCodes = true;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CATEGORIES_DELETE_REQUEST action type', () => {
    const action = {
      type: TAX_CATEGORIES_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CATEGORIES_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: TAX_CATEGORIES_GET_PARALLEL.SUCCESS,
      data: ['tax categories', 'tax codes']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadTaxCategories = false;
    state.taxCategories = action.data[0];
    state.taxCodes = action.data[1];

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CATEGORIES_SAVE_SUCCESS action type', () => {
    const action = {
      type: TAX_CATEGORIES_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadTaxCategories = true;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CATEGORIES_UPDATE_SUCCESS action type', () => {
    const action = {
      type: TAX_CATEGORIES_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadTaxCategories = true;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles TAX_CATEGORIES_DELETE_SUCCESS action type', () => {
    const action = {
      type: TAX_CATEGORIES_DELETE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadTaxCategories = true;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(taxes(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(taxes(initialState, {})).toEqual(initialState);
  });
});
