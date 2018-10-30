import purchaseOrder from 'redux-base/reducers/purchase/purchaseOrder';
import {
  PURCHASE_ORDER_GET_PARALLEL,
  PURCHASE_ORDER_FIELDS_GET_PARALLEL,
  PURCHASE_ORDER_SAVE,
  PURCHASE_ORDER_UPDATE,
  PURCHASE_SUPPLIER_GET,
  SKU_WAREHOUSE_INFO_GET,
  ERROR
} from 'redux-base/actions';
import MockDate from 'mockdate';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('purchaseOrder', () => {
  MockDate.set('10/24/2017');
  const initialValues = {
    id: undefined,
    deliveryDate: new Date(),
    contactUser: {},
    deliveryMethod: {},
    paymentTerms: {},
    status: 'Draft',
    internalNotes: '',
    vendorNotes: '',
    details: [{
      id: null,
      sku: '',
      name: '',
      supplierSku: '',
      uomName: '',
      availableQty: '',
      price: '',
      qty: '',
      discount: 0,
      tax: '',
      total: ''
    }],
    vendor: {
      id: undefined,
      name: '',
      email: '',
      address: {}
    },
    billToCompany: {
      id: undefined,
      name: '',
      address: {}
    },
    shipToCompany: {
      id: undefined,
      name: '',
      address: {}
    },
    shipping: 0,
    adjustment: 0,
  };

  const initialState = {
    loadingPage: false,
    vendorLocations: [],
    companyLocations: [],
    contactUsers: [],
    initialValues
  };
  MockDate.reset();

  it('handles PURCHASE_ORDER_GET_PARALLEL_REQUEST action type', () => {
    const action = {
      type: PURCHASE_ORDER_GET_PARALLEL.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(purchaseOrder(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_ORDER_FIELDS_GET_PARALLEL action type', () => {
    const action = {
      type: PURCHASE_ORDER_FIELDS_GET_PARALLEL.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(purchaseOrder(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_GET_REQUEST action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(purchaseOrder(initialState, action)).toEqual(state);
  });

  it('handles SKU_WAREHOUSE_INFO_GET_REQUEST action type', () => {
    const action = {
      type: SKU_WAREHOUSE_INFO_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(purchaseOrder(initialState, action)).toEqual(state);
  });

  it('handles SKU_WAREHOUSE_INFO_GET_SUCCESS action type', () => {
    const action = {
      type: SKU_WAREHOUSE_INFO_GET.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(purchaseOrder(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_ORDER_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_ORDER_GET_PARALLEL.SUCCESS,
      data: ['initialValues', 'companyLocations', 'contactUsers']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    [state.initialValues, state.companyLocations, state.contactUsers] = action.data;

    expect(purchaseOrder(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_ORDER_SAVE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_ORDER_SAVE.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.initialValues = action.data;

    expect(purchaseOrder(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_ORDER_UPDATE_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_ORDER_UPDATE.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.initialValues = action.data;

    expect(purchaseOrder(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_ORDER_FIELDS_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_ORDER_FIELDS_GET_PARALLEL.SUCCESS,
      data: [[{
        id: '1',
        name: 'name',
        address: 'address',
        typeDescription: 'type',
        isDefault: true
      }], [{
        id: '2',
        name: 'name 2',
        address: 'address 2',
        typeDescription: 'type 2',
        isDefault: false
      }]]
    };
    const {
      id,
      name,
      address
    } = action.data[0][0];

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    [state.companyLocations, state.contactUsers] = action.data;
    state.initialValues = {
      ...initialValues,
      billToCompany: {
        id,
        name,
        address
      }
    };

    expect(purchaseOrder(initialState, action)).toEqual(state);
  });

  it('handles PURCHASE_SUPPLIER_GET_SUCCESS action type', () => {
    const action = {
      type: PURCHASE_SUPPLIER_GET.SUCCESS,
      data: {
        id: '1',
        name: 'name',
        locations: [{
          value: 'Some value'
        }],
        paymentTerms: {
          id: '1',
          name: 'name'
        }
      }
    };

    const state = cloneDeep(initialState);
    state.vendorLocations = action.data.locations.map(location => ({
      id: action.data.id,
      name: action.data.name,
      address: location
    }));
    state.initialValues = {
      ...state.initialValues,
      vendor: {
        id: action.data.id,
        name: action.data.name,
        address: action.data.locations[0],
      },
      paymentTerms: {
        id: action.data.paymentTerms.id,
        name: action.data.paymentTerms.name
      }
    };

    expect(purchaseOrder(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(purchaseOrder(initialState, action)).toEqual(state);
  });
});
