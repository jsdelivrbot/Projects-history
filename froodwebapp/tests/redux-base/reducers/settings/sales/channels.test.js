import channels from 'redux-base/reducers/settings/sales/channels';
import {
  CHANNELS_GET,
  CHANNEL_UPDATE,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('channels reducer', () => {
  const initialState = {
    data: [],
    channelData: [],
    priceList: [],
    payterms: [],
    loadingPage: false
  };

  it('handles CHANNELS_GET_REQUEST action type', () => {
    const action = {
      type: CHANNELS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(channels(initialState, action)).toEqual(state);
  });

  it('handles CHANNEL_UPDATE_REQUEST action type', () => {
    const action = {
      type: CHANNEL_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(channels(initialState, action)).toEqual(state);
  });

  it('handles CHANNELS_GET_SUCCESS action type', () => {
    const action = {
      type: CHANNELS_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.data = action.data;

    expect(channels(initialState, action)).toEqual(state);
  });

  it('handles CHANNEL_UPDATE_SUCCESS action type', () => {
    const action = {
      type: CHANNEL_UPDATE.SUCCESS,
      data: {
        id: '1',
        value: 'Some value'
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(channels(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(channels(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(channels(initialState, {})).toEqual(initialState);
  });
});
