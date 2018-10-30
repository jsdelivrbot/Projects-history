import supplier from 'redux-base/reducers/purchase/supplier';
import {
  PURCHASE_SUPPLIER_INFO_GET,
  PURCHASE_SUPPLIER_SAVE,
  PURCHASE_SUPPLIER_UPDATE,
  PURCHASE_SUPPLIER_NOTES_GET,
  PURCHASE_SUPPLIER_NOTES_SAVE,
  PURCHASE_SUPPLIER_LOCATIONS_GET,
  PURCHASE_SUPPLIER_LOCATIONS_SAVE,
  PURCHASE_SUPPLIER_LOCATIONS_UPDATE,
  PURCHASE_SUPPLIER_LOCATIONS_DELETE,
  PURCHASE_SUPPLIER_CONTACTS_GET,
  PURCHASE_SUPPLIER_CONTACTS_SAVE,
  PURCHASE_SUPPLIER_CONTACTS_UPDATE,
  PURCHASE_SUPPLIER_CONTACTS_DELETE,
  PURCHASE_SUPPLIER_ORDERS_GET,
  PURCHASE_SUPPLIER_PRICE_LIST_GET_PARALLEL,
  PURCHASE_SUPPLIER_PRICE_LIST_UPDATE,
  STATE_CITIES_GET,
  ERROR
} from 'redux-base/actions';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('supplier reducer', () => {
  const initialState = {
    supplierData: null,
    supplierCreated: false,
    notes: [],
    locations: [],
    contacts: [],
    orders: [],
    priceLists: [],
    priceListData: {
      data: [],
      priceList: {}
    },
    loadingPage: false,
    needReloadNotes: false,
    needReloadLocations: false,
    needReloadContacts: false,
    needReloadPriceLists: false
  };

  it('handles PURCHASE_SUPPLIER_INFO_GET_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_INFO_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_SAVE_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_UPDATE_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_NOTES_GET_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_NOTES_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_NOTES_SAVE_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_NOTES_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_LOCATIONS_GET_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_LOCATIONS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_LOCATIONS_SAVE_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_LOCATIONS_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_LOCATIONS_UPDATE_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_LOCATIONS_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_LOCATIONS_DELETE_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_LOCATIONS_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_CONTACTS_GET_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_CONTACTS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_CONTACTS_SAVE_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_CONTACTS_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_CONTACTS_UPDATE_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_CONTACTS_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_CONTACTS_DELETE_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_CONTACTS_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_ORDERS_GET_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_ORDERS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_PRICE_LIST_GET_PARALLEL_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_PRICE_LIST_GET_PARALLEL.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_PRICE_LIST_UPDATE_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_PRICE_LIST_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles STATE_CITIES_GET_REQUEST action type', () => {
    const action = {
      type: STATE_CITIES_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadNotes = false;
    state.needReloadLocations = false;
    state.needReloadContacts = false;
    state.needReloadPriceLists = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_INFO_GET_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_INFO_GET.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.supplierData = action.data;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_SAVE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_SAVE.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.supplierCreated = true;
    state.supplierData = action.data;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_UPDATE.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.supplierCreated = true;
    state.supplierData = action.data;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_LOCATIONS_GET_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_LOCATIONS_GET.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.locations = action.data;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_LOCATIONS_SAVE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_LOCATIONS_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadLocations = true;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_LOCATIONS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_LOCATIONS_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadLocations = true;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_LOCATIONS_DELETE.SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_LOCATIONS_DELETE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadLocations = true;
    state.needReloadContacts = true;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_CONTACTS_GET_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_CONTACTS_GET.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.contacts = action.data;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_CONTACTS_SAVE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_CONTACTS_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadContacts = true;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_CONTACTS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_CONTACTS_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadContacts = true;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_CONTACTS_DELETE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_CONTACTS_DELETE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadContacts = true;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_ORDERS_GET_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_ORDERS_GET.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.orders = action.data;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_PRICE_LIST_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_PRICE_LIST_GET_PARALLEL.SUCCESS,
      data: ['Price list data', 'price lists']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.priceListData = action.data[0];
    state.priceLists = action.data[1];

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_PRICE_LIST_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_PRICE_LIST_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadPriceLists = true;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_NOTES_GET_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_NOTES_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.notes = action.data;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_NOTES_SAVE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_NOTES_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadNotes = true;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles STATE_CITIES_GET_SUCCESS action type', () => {
    const action = {
      type: STATE_CITIES_GET.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(supplier(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.supplierCreated = false;

    expect(supplier(initialState, action)).toEqual(state);
  });
});
