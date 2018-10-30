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

export const initialValues = {
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
  promotionDiscount: 0,
  customerCredit: 0,
  promotion: {
    id: null,
    code: ''
  },
  customerNotes: null
};

// --------------------------- Reducer function --------------------------
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

const addParentIdToChildren = data => data.map(row => ({
  ...row,
  list: row.list.map(item => ({
    ...item,
    children: item.children.map(child => ({
      ...child,
      parentId: item.id
    }))
  }))
}));

export default function order(state = initialState, action = {}) {
  switch (action.type) {
    // REQUEST
    case ORDER_GET.REQUEST:
    case ORDER_SAVE.REQUEST:
    case ORDER_UPDATE.REQUEST:
    case ORDER_GET_INVOICE_DATA.REQUEST:
    case ORDER_GET_PICK_DATA.REQUEST:
    case ORDER_GET_ALLOCATION_DATA.REQUEST:
    case ORDER_GET_PACK_DATA.REQUEST:
    case ORDER_GET_SHIP_DATA.REQUEST:
    case ORDER_UPDATE_PICK_DATA.REQUEST:
    case ORDER_UPDATE_ALLOCATION_DATA.REQUEST:
    case ORDER_UPDATE_PACK_DATA.REQUEST:
    case ORDER_UPDATE_SHIP_DATA.REQUEST:
    case CUSTOMER_ADDRESSES_GET.REQUEST:
      return {
        ...state,
        loadingPage: true
      };

    // SUCCESS
    case ORDER_GET.SUCCESS:
    case ORDER_SAVE.SUCCESS:
    case ORDER_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        initialValues: {
          ...action.data,
          billingAddress: {
            id: action.data.billingAddress.id,
            name: action.data.customer.name,
            address: action.data.billingAddress
          },
          shippingAddress: {
            id: action.data.shippingAddress.id,
            name: action.data.customer.name,
            address: action.data.shippingAddress
          }
        }
      };
    case ORDER_GET_ALLOCATION_DATA.SUCCESS:
    case ORDER_UPDATE_ALLOCATION_DATA.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        allocationData: action.data
      };
    case ORDER_GET_PICK_DATA.SUCCESS:
    case ORDER_UPDATE_PICK_DATA.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        pickData: addParentIdToChildren(action.data)
      };
    case ORDER_GET_PACK_DATA.SUCCESS:
    case ORDER_UPDATE_PACK_DATA.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        packData: addParentIdToChildren(action.data)
      };
    case ORDER_GET_SHIP_DATA.SUCCESS:
    case ORDER_UPDATE_SHIP_DATA.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        shipData: action.data
      };
    case CUSTOMER_ADDRESSES_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        defaultCustomerAddress: action.data.addresses.find(add => add.isDefault),
        customerAddresses: action.data.addresses.map(address => ({
          id: address.id,
          name: action.data.name,
          address
        }))
      };
    case ORDER_GET_INVOICE_DATA.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        invoiceData: action.data
      };
    case '@@router/LOCATION_CHANGE': {
      return initialState;
    }
    case ERROR:
      return {
        ...state,
        loadingPage: false
      };
    default:
      return state;
  }
}

