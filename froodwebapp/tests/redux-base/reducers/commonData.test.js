import commonData from 'redux-base/reducers/commonData';
import {
  GET_COMMON_DATA,
  STATE_CITIES_GET,
  DELIVERY_INFO_GET_PARALLEL,
  LOGOUT
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('commonData reducer', () => {
  const initialState = {
    commonDataLoading: false,
    commonDataLoaded: false,
    countries: [],
    countryStates: [],
    userCountryStates: [],
    cities: [],
    currencies: [],
    payterms: [],
    locationTypes: [],
    defaultLocations: [],
    zoneTypes: [],
    categories: [],
    skuStatusTypes: [],
    allocationTypes: [],
    deliveryMethods: [],
    promotionFields: [],
    adjustmentReasons: [],
    taxCategories: [],
    deliveryMethodInfo: {},
    deliverySlotsInfo: [],
    shippingMethods: [],
    orderTypes: []
  };

  it('handles GET_COMMON_DATA_REQUEST action type', () => {
    const action = {
      type: GET_COMMON_DATA.REQUEST
    };

    const state = cloneDeep(initialState);
    state.commonDataLoading = true;

    expect(commonData(initialState, action)).toEqual(state);
  });

  it('handles GET_COMMON_DATA_SUCCESS action type', () => {
    const action = {
      type: GET_COMMON_DATA.SUCCESS,
      data: {
        countries: 'countries data',
        countryStates: 'country states data',
        states: 'user country states data',
        currencies: 'currencies data',
        paymentTerms: 'payment terms data',
        locationTypes: 'location types data',
        defaultLocations: 'default locations data',
        zoneTypes: 'zone types data',
        categories: 'categories data',
        skuStatusTypes: 'sku status types data',
        allocationTypes: 'allocationTypes data',
        transporters: 'deliveryMethods data',
        promotionFields: 'promotionFields data',
        adjustmentReasons: 'adjustmentReasons data',
        taxCategories: 'taxCategories data',
        shippingMethods: ['some data'],
        orderTypes: ['some order type']
      }
    };

    const state = cloneDeep(initialState);
    state.commonDataLoading = false;
    state.commonDataLoaded = true;
    state.countries = 'countries data';
    state.countryStates = 'country states data';
    state.userCountryStates = 'user country states data';
    state.currencies = 'currencies data';
    state.payterms = 'payment terms data';
    state.locationTypes = 'location types data';
    state.defaultLocations = 'default locations data';
    state.zoneTypes = 'zone types data';
    state.categories = 'categories data';
    state.skuStatusTypes = 'sku status types data';
    state.allocationTypes = 'allocationTypes data';
    state.deliveryMethods = 'deliveryMethods data';
    state.promotionFields = 'promotionFields data';
    state.adjustmentReasons = 'adjustmentReasons data';
    state.taxCategories = 'taxCategories data';
    state.shippingMethods = ['some data'];
    state.orderTypes = ['some order type'];

    expect(commonData(initialState, action)).toEqual(state);
  });

  it('handles STATE_CITIES_GET_SUCCESS action type', () => {
    const action = {
      type: STATE_CITIES_GET.SUCCESS,
      data: {
        NY: 'New York',
        LA: 'Los Angeles'
      }
    };
    const state = cloneDeep(initialState);
    state.cities = action.data;

    expect(commonData(initialState, action)).toEqual(state);
  });

  it('handles LOGOUT action type', () => {
    const action = {
      type: LOGOUT
    };

    expect(commonData(initialState, action)).toEqual(initialState);
  });

  it('handles DELIVERY_INFO_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: DELIVERY_INFO_GET_PARALLEL.SUCCESS,
      data: ['deliveryMethodInfo', 'deliverySlotsInfo']
    };
    const state = cloneDeep(initialState);
    [state.deliveryMethodInfo, state.deliverySlotsInfo] = action.data;

    expect(commonData(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(commonData(initialState, {})).toEqual(initialState);
  });
});
