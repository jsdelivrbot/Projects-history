import download from 'redux-base/reducers/download';
import { ORDERS } from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('download reducer', () => {
  const initialState = {
    loadingPage: false,
    downloadedItem: null
  };

  it('handles ORDERS.DOWNLOAD_ITEM_REQUEST action type', () => {
    const action = {
      type: ORDERS.DOWNLOAD_ITEM.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(download(initialState, action)).toEqual(state);
  });

  it('handles ORDERS.SUCCESS action type', () => {
    const action = {
      type: ORDERS.DOWNLOAD_ITEM.SUCCESS,
      data: 'some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.downloadedItem = action.data;

    expect(download(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(download(initialState, {})).toEqual({ initialState });
  });
});
