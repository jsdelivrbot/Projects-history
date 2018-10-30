import item from 'redux-base/reducers/inventory/item';
import {
  ITEM_INFO_GET_PARALLEL,
  ITEM_INFO_GET,
  ITEM_INFO_SAVE,
  ITEM_INFO_UPDATE,
  ITEM_BINS_GET,
  ITEM_BINS_SAVE,
  ITEM_BINS_UPDATE,
  ITEM_SUPPLIERS_GET,
  ITEM_SUPPLIERS_SAVE,
  ITEM_SUPPLIERS_UPDATE,
  ITEM_UOM_GET,
  ITEM_UOM_SAVE,
  ITEM_UOM_UPDATE,
  ITEM_UOM_DELETE,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('adjustment reducer', () => {
  const initialState = {
    itemInfo: {},
    bins: [],
    availableBins: [],
    suppliers: [],
    uoms: [],
    loadingPage: false,
    needReloadBins: false,
    needReloadUOM: false,
    needReloadSuppliers: false
  };

  it('handles ITEM_INFO_GET_PARALLEL_REQUEST action type', () => {
    const action = {
      type: ITEM_INFO_GET_PARALLEL.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadBins = false;
    state.needReloadUOM = false;
    state.needReloadSuppliers = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_INFO_GET_REQUEST action type', () => {
    const action = {
      type: ITEM_INFO_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadBins = false;
    state.needReloadUOM = false;
    state.needReloadSuppliers = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_INFO_SAVE_REQUEST action type', () => {
    const action = {
      type: ITEM_INFO_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadBins = false;
    state.needReloadUOM = false;
    state.needReloadSuppliers = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_INFO_UPDATE_REQUEST action type', () => {
    const action = {
      type: ITEM_INFO_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadBins = false;
    state.needReloadUOM = false;
    state.needReloadSuppliers = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_BINS_GET_REQUEST action type', () => {
    const action = {
      type: ITEM_BINS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadBins = false;
    state.needReloadUOM = false;
    state.needReloadSuppliers = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_BINS_SAVE_REQUEST action type', () => {
    const action = {
      type: ITEM_BINS_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadBins = false;
    state.needReloadUOM = false;
    state.needReloadSuppliers = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_BINS_UPDATE_REQUEST action type', () => {
    const action = {
      type: ITEM_BINS_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadBins = false;
    state.needReloadUOM = false;
    state.needReloadSuppliers = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_UOM_GET_REQUEST action type', () => {
    const action = {
      type: ITEM_UOM_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadBins = false;
    state.needReloadUOM = false;
    state.needReloadSuppliers = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_UOM_SAVE_REQUEST action type', () => {
    const action = {
      type: ITEM_UOM_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadBins = false;
    state.needReloadUOM = false;
    state.needReloadSuppliers = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_UOM_UPDATE_REQUEST action type', () => {
    const action = {
      type: ITEM_UOM_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadBins = false;
    state.needReloadUOM = false;
    state.needReloadSuppliers = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_UOM_DELETE_REQUEST action type', () => {
    const action = {
      type: ITEM_UOM_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadBins = false;
    state.needReloadUOM = false;
    state.needReloadSuppliers = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_SUPPLIERS_GET_REQUEST action type', () => {
    const action = {
      type: ITEM_SUPPLIERS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadBins = false;
    state.needReloadUOM = false;
    state.needReloadSuppliers = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_SUPPLIERS_SAVE_REQUEST action type', () => {
    const action = {
      type: ITEM_SUPPLIERS_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadBins = false;
    state.needReloadUOM = false;
    state.needReloadSuppliers = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_SUPPLIERS_UPDATE_REQUEST action type', () => {
    const action = {
      type: ITEM_SUPPLIERS_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadBins = false;
    state.needReloadUOM = false;
    state.needReloadSuppliers = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_INFO_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: ITEM_INFO_GET_PARALLEL.SUCCESS,
      data: ['some data']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.itemInfo = action.data[0];

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_INFO_GET_SUCCESS action type', () => {
    const action = {
      type: ITEM_INFO_GET.SUCCESS,
      data: ['some data']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.itemInfo = action.data;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_INFO_SAVE_SUCCESS action type', () => {
    const action = {
      type: ITEM_INFO_SAVE.SUCCESS,
      data: ['some data']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.itemInfo = action.data;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_INFO_UPDATE_SUCCESS action type', () => {
    const action = {
      type: ITEM_INFO_UPDATE.SUCCESS,
      data: ['some data']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.itemInfo = action.data;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_BINS_GET_SUCCESS action type', () => {
    const action = {
      type: ITEM_BINS_GET.SUCCESS,
      data: {
        bins: 'bins',
        availableBins: 'availableBins'
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.bins = action.data.bins;
    state.availableBins = action.data.availableBins;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_BINS_SAVE_SUCCESS action type', () => {
    const action = {
      type: ITEM_BINS_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadBins = true;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_BINS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: ITEM_BINS_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadBins = true;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_SUPPLIERS_GET_SUCCESS action type', () => {
    const action = {
      type: ITEM_SUPPLIERS_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.suppliers = action.data;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_SUPPLIERS_SAVE_SUCCESS action type', () => {
    const action = {
      type: ITEM_SUPPLIERS_SAVE.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadSuppliers = true;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_UOM_GET_SUCCESS action type', () => {
    const action = {
      type: ITEM_UOM_GET.SUCCESS,
      data: 'some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.uoms = action.data;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_UOM_SAVE_SUCCESS action type', () => {
    const action = {
      type: ITEM_UOM_SAVE.SUCCESS,
      data: 'some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadUOM = true;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_UOM_UPDATE_SUCCESS action type', () => {
    const action = {
      type: ITEM_UOM_UPDATE.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadUOM = true;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ITEM_UOM_DELETE_SUCCESS action type', () => {
    const action = {
      type: ITEM_UOM_DELETE.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadUOM = true;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles @@router/LOCATION_CHANGE action type', () => {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: ['']
      }
    };

    const state = cloneDeep(initialState);

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(item(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(item(initialState, {})).toEqual(initialState);
  });
});
