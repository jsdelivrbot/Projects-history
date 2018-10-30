import order from 'redux-base/reducers/sales/order';
import {
  ORDER_GET,
  ORDER_SAVE,
  ORDER_UPDATE,

  ORDER_GET_PICK_DATA,
  ORDER_GET_ALLOCATION_DATA,
  ORDER_GET_PACK_DATA,
  ORDER_GET_SHIP_DATA,
  ORDER_GET_INVOICE_DATA,

  ORDER_UPDATE_PICK_DATA,
  ORDER_UPDATE_ALLOCATION_DATA,
  ORDER_UPDATE_PACK_DATA,
  ORDER_UPDATE_SHIP_DATA,

  CUSTOMER_ADDRESSES_GET,
  // common
  ERROR
} from 'redux-base/actions';
import MockDate from 'mockdate';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('order', () => {
  MockDate.set('10/24/2017');
  const initialValues = {
    id: undefined,
    status: 'Not Saved',
    channel: {
      id: 1,
      name: 'Manual'
    },
    channelRefNo: 'Unassigned',
    customer: {
      id: null,
      name: ''
    },
    shippingAddress: {
      id: null,
      name: '',
      address: {}
    },
    billingAddress: {
      id: null,
      name: '',
      address: {}
    },
    customerCredit: 0,
    deliveryDate: null,
    deliveryMethodId: null,
    deliverySlotId: null,
    isRecurring: false,
    orderDate: new Date(),
    paymentTerms: {
      id: null,
      name: ''
    },
    skuDetails: [{
      id: null,
      sku: '',
      name: '',
      uomName: '',
      availableQty: '',
      price: '',
      qty: '',
      discount: 0,
      tax: '',
      total: ''
    }],
    promoCode: null,
    customerNotes: null
  };

  const initialState = {
    loadingPage: false,
    invoiceData: {},
    pickData: [],
    allocationData: {},
    packData: [],
    shipData: [],
    defaultCustomerAddress: {},
    customerAddresses: [],
    initialValues
  };
  MockDate.reset();

  it('handles ORDER_GET_REQUEST action type', () => {
    const action = {
      type: ORDER_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_SAVE_REQUEST action type', () => {
    const action = {
      type: ORDER_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_UPDATE_REQUEST action type', () => {
    const action = {
      type: ORDER_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_GET_INVOICE_DATA_REQUEST action type', () => {
    const action = {
      type: ORDER_GET_INVOICE_DATA.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_GET_PICK_DATA_REQUEST action type', () => {
    const action = {
      type: ORDER_GET_PICK_DATA.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_GET_ALLOCATION_DATA_REQUEST action type', () => {
    const action = {
      type: ORDER_GET_ALLOCATION_DATA.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_GET_PACK_DATA_REQUEST action type', () => {
    const action = {
      type: ORDER_GET_PACK_DATA.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_GET_SHIP_DATA.REQUEST action type', () => {
    const action = {
      type: ORDER_GET_SHIP_DATA.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_UPDATE_PICK_DATA_REQUEST action type', () => {
    const action = {
      type: ORDER_UPDATE_PICK_DATA.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_UPDATE_ALLOCATION_DATA_REQUEST action type', () => {
    const action = {
      type: ORDER_UPDATE_PICK_DATA.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_UPDATE_PACK_DATA_REQUEST action type', () => {
    const action = {
      type: ORDER_UPDATE_PACK_DATA.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_UPDATE_SHIP_DATA_REQUEST action type', () => {
    const action = {
      type: ORDER_UPDATE_SHIP_DATA.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ADDRESSES_GET_REQUEST action type', () => {
    const action = {
      type: CUSTOMER_ADDRESSES_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_GET_SUCCESS action type', () => {
    const action = {
      type: ORDER_GET.SUCCESS,
      data: {
        billingAddress: {
          id: '1'
        },
        shippingAddress: {
          id: '1'
        },
        customer: {
          name: 'name'
        }
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.initialValues = {
      billingAddress: {
        id: action.data.billingAddress.id,
        name: action.data.customer.name,
        address: action.data.billingAddress
      },
      shippingAddress: {
        id: action.data.shippingAddress.id,
        name: action.data.customer.name,
        address: action.data.shippingAddress
      },
      customer: {
        name: 'name'
      }
    };

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_SAVE_SUCCESS action type', () => {
    const action = {
      type: ORDER_SAVE.SUCCESS,
      data: {
        billingAddress: {
          id: '1'
        },
        shippingAddress: {
          id: '1'
        },
        customer: {
          name: 'name'
        }
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.initialValues = {
      billingAddress: {
        id: action.data.billingAddress.id,
        name: action.data.customer.name,
        address: action.data.billingAddress
      },
      shippingAddress: {
        id: action.data.shippingAddress.id,
        name: action.data.customer.name,
        address: action.data.shippingAddress
      },
      customer: {
        name: 'name'
      }
    };

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_UPDATE_SUCCESS action type', () => {
    const action = {
      type: ORDER_UPDATE.SUCCESS,
      data: {
        billingAddress: {
          id: '1'
        },
        shippingAddress: {
          id: '1'
        },
        customer: {
          name: 'name'
        }
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.initialValues = {
      billingAddress: {
        id: action.data.billingAddress.id,
        name: action.data.customer.name,
        address: action.data.billingAddress
      },
      shippingAddress: {
        id: action.data.shippingAddress.id,
        name: action.data.customer.name,
        address: action.data.shippingAddress
      },
      customer: {
        name: 'name'
      }
    };

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_GET_PICK_DATA_SUCCESS action type', () => {
    const action = {
      type: ORDER_GET_PICK_DATA.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.pickData = action.data;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_UPDATE_PICK_DATA_SUCCESS action type', () => {
    const action = {
      type: ORDER_UPDATE_PICK_DATA.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.pickData = action.data;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_GET_ALLOCATION_DATA_SUCCESS action type', () => {
    const action = {
      type: ORDER_GET_ALLOCATION_DATA.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.allocationData = action.data;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_UPDATE_ALLOCATION_DATA_SUCCESS action type', () => {
    const action = {
      type: ORDER_UPDATE_ALLOCATION_DATA.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.allocationData = action.data;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_GET_PACK_DATA_SUCCESS action type', () => {
    const action = {
      type: ORDER_GET_PACK_DATA.SUCCESS,
      data: [{
        list: [{
          id: 'id',
          children: ['child']
        }]
      }]
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.packData = action.data.map(row => ({
      ...row,
      list: row.list.map(item => ({
        ...item,
        children: item.children.map(child => ({
          ...child,
          parentId: item.id
        }))
      }))
    }));

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_UPDATE_PACK_DATA_SUCCESS action type', () => {
    const action = {
      type: ORDER_UPDATE_PACK_DATA.SUCCESS,
      data: [{
        list: [{
          id: 'id',
          children: ['child']
        }]
      }]
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.packData = action.data.map(row => ({
      ...row,
      list: row.list.map(item => ({
        ...item,
        children: item.children.map(child => ({
          ...child,
          parentId: item.id
        }))
      }))
    }));

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_GET_SHIP_DATA_SUCCESS action type', () => {
    const action = {
      type: ORDER_GET_SHIP_DATA.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.shipData = action.data;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_UPDATE_SHIP_DATA_SUCCESS action type', () => {
    const action = {
      type: ORDER_UPDATE_SHIP_DATA.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.shipData = action.data;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles CUSTOMER_ADDRESSES_GET_SUCCESS action type', () => {
    const action = {
      type: CUSTOMER_ADDRESSES_GET.SUCCESS,
      name: 'name',
      data: {
        addresses: [{
          id: '1',
          isDefault: true
        }]
      }
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.defaultCustomerAddress = action.data.addresses.find(add => add.isDefault);
    state.customerAddresses = action.data.addresses.map(address => ({
      id: address.id,
      name: action.data.name,
      address
    }));
    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ORDER_GET_INVOICE_DATA_SUCCESS action type', () => {
    const action = {
      type: ORDER_GET_INVOICE_DATA.SUCCESS,
      data: 'Some data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.invoiceData = action.data;

    expect(order(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR,
      data: 'Some data'
    };
    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(order(initialState, action)).toEqual(state);
  });
});
