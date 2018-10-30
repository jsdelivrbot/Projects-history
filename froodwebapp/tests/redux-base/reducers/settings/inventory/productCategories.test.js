import productCategories from 'redux-base/reducers/settings/inventory/productCategories';
import {
  PROD_CAT_GET,
  PROD_CAT_SAVE,
  PROD_CAT_UPDATE,
  PROD_CAT_DELETE,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('productCategories reducer', () => {
  const initialState = {
    data: [],
    loadingPage: false,
    needReloadProductCategories: false
  };

  it('handles PROD_CAT_GET_REQUEST action type', () => {
    const action = {
      type: PROD_CAT_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadProductCategories = false;

    expect(productCategories(initialState, action)).toEqual(state);
  });

  it('handles PROD_CAT_SAVE_REQUEST action type', () => {
    const action = {
      type: PROD_CAT_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadProductCategories = false;

    expect(productCategories(initialState, action)).toEqual(state);
  });

  it('handles PROD_CAT_UPDATE_REQUEST action type', () => {
    const action = {
      type: PROD_CAT_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadProductCategories = false;

    expect(productCategories(initialState, action)).toEqual(state);
  });

  it('handles PROD_CAT_DELETE_REQUEST action type', () => {
    const action = {
      type: PROD_CAT_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadProductCategories = false;

    expect(productCategories(initialState, action)).toEqual(state);
  });

  it('handles PROD_CAT_GET_SUCCESS action type', () => {
    const action = {
      type: PROD_CAT_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.data = action.data;

    expect(productCategories(initialState, action)).toEqual(state);
  });

  it('handles PROD_CAT_SAVE_SUCCESS action type', () => {
    const action = {
      type: PROD_CAT_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadProductCategories = true;

    expect(productCategories(initialState, action)).toEqual(state);
  });

  it('handles PROD_CAT_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PROD_CAT_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadProductCategories = true;

    expect(productCategories(initialState, action)).toEqual(state);
  });

  it('handles PROD_CAT_DELETE_SUCCESS action type', () => {
    const action = {
      type: PROD_CAT_DELETE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadProductCategories = true;

    expect(productCategories(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(productCategories(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(productCategories(initialState, {})).toEqual(initialState);
  });
});
