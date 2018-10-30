import bundle from 'redux-base/reducers/inventory/bundle';
import {
  BUNDLE_INFO_GET_PARALLEL,
  BUNDLE_INFO_SAVE,
  BUNDLE_INFO_UPDATE,
  BUNDLE_ITEMS_GET,
  BUNDLE_ITEMS_SAVE,
  BUNDLE_ITEMS_UPDATE,
  BUNDLE_ITEMS_DELETE,
  BUNDLE_ASSEMBLIES_GET,
  BUNDLE_ASSEMBLIES_UPDATE,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('bundle reducer', () => {
  const initialState = {
    loadingPage: false,
    needReloadItems: false,
    needReloadAssemblies: false,
    bundleInfo: {
      defaultLocationId: 8,
      statusId: 0,
      allocTypeId: 1
    },
    bundleItems: [],
    bundleAssemblies: {
      details: []
    }
  };

  it('handles BUNDLE_INFO_GET_PARALLEL_REQUEST action type', () => {
    const action = {
      type: BUNDLE_INFO_GET_PARALLEL.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadItems = false;
    state.needReloadAssemblies = false;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_INFO_SAVE_REQUEST action type', () => {
    const action = {
      type: BUNDLE_INFO_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadItems = false;
    state.needReloadAssemblies = false;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_INFO_UPDATE_REQUEST action type', () => {
    const action = {
      type: BUNDLE_INFO_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadItems = false;
    state.needReloadAssemblies = false;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ITEMS_GET_REQUEST action type', () => {
    const action = {
      type: BUNDLE_ITEMS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadItems = false;
    state.needReloadAssemblies = false;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ITEMS_SAVE_REQUEST action type', () => {
    const action = {
      type: BUNDLE_ITEMS_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadItems = false;
    state.needReloadAssemblies = false;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ITEMS_UPDATE_REQUEST action type', () => {
    const action = {
      type: BUNDLE_ITEMS_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadItems = false;
    state.needReloadAssemblies = false;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ITEMS_DELETE_REQUEST action type', () => {
    const action = {
      type: BUNDLE_ITEMS_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadItems = false;
    state.needReloadAssemblies = false;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ASSEMBLIES_GET_REQUEST action type', () => {
    const action = {
      type: BUNDLE_ASSEMBLIES_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadItems = false;
    state.needReloadAssemblies = false;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ASSEMBLIES_UPDATE_REQUEST action type', () => {
    const action = {
      type: BUNDLE_ASSEMBLIES_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadItems = false;
    state.needReloadAssemblies = false;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_INFO_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_INFO_GET_PARALLEL.SUCCESS,
      data: ['some data']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.bundleInfo = action.data[0];

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_INFO_SAVE_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_INFO_SAVE.SUCCESS,
      data: ['some data']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.bundleInfo = action.data;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_INFO_UPDATE_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_INFO_UPDATE.SUCCESS,
      data: ['some data']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.bundleInfo = action.data;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ITEMS_GET_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_ITEMS_GET.SUCCESS,
      data: ['some data']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.bundleItems = action.data;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ITEMS_SAVE_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_ITEMS_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadItems = true;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ITEMS_UPDATE.SUCCESS action type', () => {
    const action = {
      type: BUNDLE_ITEMS_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadItems = true;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ITEMS_DELETE_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_ITEMS_DELETE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadItems = true;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ASSEMBLIES_GET_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_ASSEMBLIES_GET.SUCCESS,
      data: ['some data']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.bundleAssemblies = action.data;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_ASSEMBLIES_UPDATE_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_ASSEMBLIES_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadAssemblies = true;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles @@router/LOCATION_CHANGE action type', () => {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: ''
      }
    };

    const state = cloneDeep(initialState);

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(bundle(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(bundle(initialState, {})).toEqual(initialState);
  });
});
