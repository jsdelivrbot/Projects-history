import customerProfile from 'redux-base/reducers/sales/customerProfile';
import {
  CUSTOMER_PROFILE_GET,
  CUSTOMER_PROFILE_UPDATE,
  CUSTOMER_ORDERS_GET,
  CUSTOMER_ADDRESSES_GET,
  CUSTOMER_ADDRESSES_SAVE,
  CUSTOMER_ADDRESSES_UPDATE,
  CUSTOMER_ADDRESSES_DELETE,
  STATE_CITIES_GET,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('customerProfile reducer', () => {
  const initialState = {
    loadingPage: false,
    needReloadAddresses: false,
    data: {
      newsLetterSubscription: false,
      weekendDelivery: false
    },
    addresses: [],
    orders: {},
    credits: []
  };

  it('handles CUSTOMER_PROFILE_GET_REQUEST action type', () => {
    const action = {
      type: CUSTOMER_PROFILE_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_PROFILE_UPDATE_REQUEST action type', () => {
    const action = {
      type: CUSTOMER_PROFILE_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ADDRESSES_GET_REQUEST action type', () => {
    const action = {
      type: CUSTOMER_ADDRESSES_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ADDRESSES_SAVE_REQUEST action type', () => {
    const action = {
      type: CUSTOMER_ADDRESSES_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ADDRESSES_UPDATE_REQUEST action type', () => {
    const action = {
      type: CUSTOMER_ADDRESSES_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ADDRESSES_DELETE_REQUEST action type', () => {
    const action = {
      type: CUSTOMER_ADDRESSES_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ORDERS_GET_REQUEST action type', () => {
    const action = {
      type: CUSTOMER_ORDERS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles STATE_CITIES_GET_REQUEST action type', () => {
    const action = {
      type: STATE_CITIES_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_PROFILE_GET_SUCCESS action type', () => {
    const action = {
      type: CUSTOMER_PROFILE_GET.SUCCESS,
      data: {
        phone: 27492392,
        countryCode: '732'
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.data = {};
    state.data.countryCode = action.data.countryCode;
    state.data.phone = {};
    state.data.phone.number = action.data.phone;
    state.data.phone.countryCode = action.data.countryCode;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_PROFILE_UPDATE_SUCCESS action type', () => {
    const action = {
      type: CUSTOMER_PROFILE_UPDATE.SUCCESS,
      data: {
        phone: 27492392,
        countryCode: '732'
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.data = {};
    state.data.countryCode = action.data.countryCode;
    state.data.phone = {};
    state.data.phone.number = action.data.phone;
    state.data.phone.countryCode = action.data.countryCode;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ADDRESSES_GET_SUCCESS action type', () => {
    const action = {
      type: CUSTOMER_ADDRESSES_GET.SUCCESS,
      data: {
        addresses: ['address 1', 'address 2']
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.addresses = action.data.addresses;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ORDERS_GET_SUCCESS action type', () => {
    const action = {
      type: CUSTOMER_ORDERS_GET.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.orders = action.data;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ADDRESSES_SAVE_SUCCESS action type', () => {
    const action = {
      type: CUSTOMER_ADDRESSES_SAVE.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadAddresses = true;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ADDRESSES_DELETE_SUCCESS action type', () => {
    const action = {
      type: CUSTOMER_ADDRESSES_DELETE.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadAddresses = true;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ADDRESSES_UPDATE_SUCCESS action type', () => {
    const action = {
      type: CUSTOMER_ADDRESSES_UPDATE.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadAddresses = true;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles STATE_CITIES_GET_SUCCESS action type', () => {
    const action = {
      type: STATE_CITIES_GET.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(customerProfile(initialState, action)).toEqual(state);
  });

  it('handles @@router/LOCATION_CHANGE action type', () => {
    const action = {
      type: '@@router/LOCATION_CHANGE'
    };

    expect(customerProfile(initialState, action)).toEqual(initialState);
  });

  it('handles default case', () => {
    expect(customerProfile(initialState, {})).toEqual(initialState);
  });
});
