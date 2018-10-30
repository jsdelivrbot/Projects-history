import uom from 'redux-base/reducers/settings/system/uom';
import {
  UOM_GET,
  UOM_SAVE,
  UOM_UPDATE,
  UOM_DELETE,
  UOM_CONVERSION_GET,
  UOM_CONVERSION_SAVE,
  UOM_CONVERSION_UPDATE,
  UOM_CONVERSION_DELETE,
  ITEM_INFO_GET_PARALLEL,
  BUNDLE_INFO_GET_PARALLEL,
  BUNDLE_UOM_LOCATIONS_GET_PARALLEL
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('uom reducer', () => {
  const initialState = {
    data: [],
    conversions: [],
    loadingPage: false,
    needReloadUOM: false,
    needReloadUOMConversions: false,
  };

  it('handles UOM_GET_REQUEST action type', () => {
    const action = {
      type: UOM_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_SAVE_REQUEST action type', () => {
    const action = {
      type: UOM_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_UPDATE_REQUEST action type', () => {
    const action = {
      type: UOM_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_DELETE_REQUEST action type', () => {
    const action = {
      type: UOM_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_CONVERSION_GET_REQUEST action type', () => {
    const action = {
      type: UOM_CONVERSION_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_CONVERSION_SAVE_REQUEST action type', () => {
    const action = {
      type: UOM_CONVERSION_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_CONVERSION_UPDATE_REQUEST action type', () => {
    const action = {
      type: UOM_CONVERSION_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_CONVERSION_DELETE_REQUEST action type', () => {
    const action = {
      type: UOM_CONVERSION_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_GET_SUCCESS action type', () => {
    const action = {
      type: UOM_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadUOM = false;
    state.data = action.data;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles ITEM_INFO_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: ITEM_INFO_GET_PARALLEL.SUCCESS,
      data: ['not used', 'data']
    };

    const state = cloneDeep(initialState);
    state.data = action.data[1];

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_INFO_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_INFO_GET_PARALLEL.SUCCESS,
      data: ['not used', 'data']
    };

    const state = cloneDeep(initialState);
    state.data = action.data[1];

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_UOM_LOCATIONS_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_UOM_LOCATIONS_GET_PARALLEL.SUCCESS,
      data: ['data', 'not used']
    };

    const state = cloneDeep(initialState);
    state.data = action.data[0];

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_SAVE_SUCCESS action type', () => {
    const action = {
      type: UOM_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadUOM = true;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_UPDATE_SUCCESS action type', () => {
    const action = {
      type: UOM_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadUOM = true;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_DELETE_SUCCESS action type', () => {
    const action = {
      type: UOM_DELETE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadUOM = true;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_CONVERSION_GET_SUCCESS action type', () => {
    const action = {
      type: UOM_CONVERSION_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.conversions = action.data;
    state.needReloadUOMConversions = false;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_CONVERSION_SAVE_SUCCESS action type', () => {
    const action = {
      type: UOM_CONVERSION_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadUOMConversions = true;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_CONVERSION_UPDATE_SUCCESS action type', () => {
    const action = {
      type: UOM_CONVERSION_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadUOMConversions = true;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles UOM_CONVERSION_DELETE_SUCCESS action type', () => {
    const action = {
      type: UOM_CONVERSION_DELETE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadUOMConversions = true;

    expect(uom(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(uom(initialState, {})).toEqual(initialState);
  });
});
