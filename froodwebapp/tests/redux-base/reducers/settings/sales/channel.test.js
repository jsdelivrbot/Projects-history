import channel from 'redux-base/reducers/settings/sales/channel';
import {
  CHANNEL_GET_PARALLEL,
  CHANNEL_UPDATE,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('channel reducer', () => {
  const initialState = {
    data: {},
    priceLists: [],
    loadingPage: false
  };

  it('handles CHANNELS_GET_REQUEST action type', () => {
    const action = {
      type: CHANNEL_GET_PARALLEL.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(channel(initialState, action)).toEqual(state);
  });

  it('handles CHANNEL_UPDATE_REQUEST action type', () => {
    const action = {
      type: CHANNEL_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(channel(initialState, action)).toEqual(state);
  });

  it('handles CHANNEL_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: CHANNEL_GET_PARALLEL.SUCCESS,
      data: ['data', 'pricelists']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    [state.data, state.priceLists] = action.data;

    expect(channel(initialState, action)).toEqual(state);
  });

  it('handles CHANNEL_UPDATE_SUCCESS action type', () => {
    const action = {
      type: CHANNEL_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(channel(initialState, action)).toEqual(state);
  });

  it('handles @@router/LOCATION_CHANGE action type', () => {
    const action = {
      type: '@@router/LOCATION_CHANGE'
    };

    expect(channel(initialState, action)).toEqual(initialState);
  });
});
