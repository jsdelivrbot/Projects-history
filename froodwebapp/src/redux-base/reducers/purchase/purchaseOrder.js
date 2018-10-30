import moment from 'moment';
import {
  PURCHASE_ORDER_GET_PARALLEL,
  PURCHASE_ORDER_FIELDS_GET_PARALLEL,
  PURCHASE_ORDER_GET_GRN,
  PURCHASE_ORDER_GET_INVOICE,

  PURCHASE_ORDER_SAVE,
  PURCHASE_ORDER_GRN_SAVE,

  PURCHASE_ORDER_UPDATE,
  PURCHASE_ORDER_GRN_UPDATE,
  PURCHASE_ORDER_INVOICE_UPDATE,
  // supplier
  PURCHASE_SUPPLIER_GET,
  // common
  SKU_VENDOR_WAREHOUSE_INFO_GET,
  ERROR
} from 'redux-base/actions';

const getDefaultCompany = companies => companies.find(company => company.isDefault) || {};

// maps array for showing newGrn object in table
const mapGrnListArray = array => (array.map(item => ({
  sku: item.sku,
  supplierSku: item.supplierSku,
  uomName: item.uomName,
  expiryDate: moment(),
  productionDate: moment().subtract(1, 'days'),
  receivedQty: 0,
  rejectedQty: 0
})));

const getNewGrn = (initialValues) => {
  switch (initialValues.status.toLowerCase()) {
    case 'partial received': {
      // array with Partial Received items
      const filteredArray = initialValues.details.filter(item => item.status.toLowerCase() === 'partial received');
      return {
        list: mapGrnListArray(filteredArray)
      };
    }
    case 'released':
      return {
        list: mapGrnListArray(initialValues.details)
      };
    default: return {};
  }
};

// return `newGrn` object and `selectedGrnId`
// depends on order status and whether there is grn item with `DRAFT` status
const getGrnCommonData = (responseData, initialValues, status, draftItem) => {
  let selectedGrnId;
  // if item with status draft exist, use it`s id, if not - use first available item id in response array
  if (status.toLowerCase() !== 'released') {
    if (draftItem) {
      selectedGrnId = draftItem.id;
    } else {
      // when save or update action succeed - response data is a single object
      // otherwise it`s an array
      selectedGrnId = responseData.id || responseData[0].id;
    }
  }
  // get newGrn object as draftItem, if it exist, otherwise depends on status return parsed table data
  const newGrn = draftItem || getNewGrn(initialValues);
  return {
    selectedGrnId,
    newGrn
  };
};

export const initialValues = {
  id: undefined,
  deliveryDate: new Date(),
  // id = 1 to show first item in select
  contactUser: { id: 1 },
  deliveryMethod: { id: 1 },
  // empty object, cause it loads, when vendor choosed
  paymentTerms: {},
  grn: [],
  newGrn: { list: [] },
  invoices: [{ grnNo: '', list: [] }],
  status: 'Not Saved',
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

// --------------------------- Reducer function --------------------------
const initialState = {
  loadingPage: false,
  vendorLocations: [],
  companyLocations: [],
  contactUsers: [], // users of type employee
  initialValues
};

export default function purchaseOrder(state = initialState, action = {}) {

  switch (action.type) {
    // REQUEST
    case PURCHASE_ORDER_GET_PARALLEL.REQUEST:
    case PURCHASE_ORDER_FIELDS_GET_PARALLEL.REQUEST:
    case PURCHASE_SUPPLIER_GET.REQUEST:
    case PURCHASE_ORDER_GET_GRN.REQUEST:
    case PURCHASE_ORDER_GET_INVOICE.REQUEST:
    case SKU_VENDOR_WAREHOUSE_INFO_GET.REQUEST:
      return {
        ...state,
        loadingPage: true
      };

    // SUCCESS
    case SKU_VENDOR_WAREHOUSE_INFO_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false
      };
    case PURCHASE_ORDER_GET_PARALLEL.SUCCESS: {
      return {
        ...state,
        loadingPage: false,
        initialValues: {
          ...initialValues,
          ...action.data[0]
        },
        companyLocations: action.data[1],
        contactUsers: action.data[2]
      };
    }
    case PURCHASE_ORDER_GET_INVOICE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        initialValues: {
          ...state.initialValues,
          invoices: action.data,
          // as default, when page loads, show first GRN to invoice
          selectedInvoiceGrnNo: action.data[0].grnNo
        }
      };
    case PURCHASE_ORDER_SAVE.SUCCESS:
    case PURCHASE_ORDER_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        initialValues: action.data
      };
    case PURCHASE_ORDER_FIELDS_GET_PARALLEL.SUCCESS: {
      const {
        id,
        name,
        address,
        typeDescription
      } = getDefaultCompany(action.data[0]);

      const newState = {
        ...state,
        loadingPage: false,
        companyLocations: action.data[0],
        contactUsers: action.data[1],
        initialValues: {
          ...state.initialValues,
          billToCompany: {
            id,
            name,
            address
          },
          // making empty Addresses, when user inputs some data in these fields
          // and then login to another account, according to FW-386
          vendor: {},
          shipToCompany: {}
        }
      };

      if (typeDescription === 'Warehouse') {
        newState.initialValues.shipToCompany = {
          id,
          name,
          address
        };
      }

      return newState;
    }
    case PURCHASE_ORDER_GET_GRN.SUCCESS: {
      // check, whether response array has any GRN with status `Draft`
      const draftItem = action.data.find(grn => grn.status.toLowerCase() === 'draft');
      // get grn common data
      const {
        selectedGrnId,
        newGrn
      } = getGrnCommonData(action.data, state.initialValues, state.initialValues.status, draftItem);
      return {
        ...state,
        loadingPage: false,
        initialValues: {
          ...state.initialValues,
          grn: action.data,
          selectedGrnId,
          newGrn,
          selectNewGrn: 'New'
        }
      };
    }
    case PURCHASE_ORDER_GRN_SAVE.SUCCESS:
    case PURCHASE_ORDER_GRN_UPDATE.SUCCESS: {
      // check, whether response item has status `Draft`
      const draftItem = (action.data.status.toLowerCase() === 'draft') && action.data;
      // get grn common data
      const {
        selectedGrnId,
        newGrn
      } = getGrnCommonData(action.data, state.initialValues, action.data.orderStatus, draftItem);
      return {
        ...state,
        loadingPage: false,
        initialValues: {
          ...state.initialValues,
          status: action.data.orderStatus,
          grn: [
            ...state.initialValues.grn,
            action.data
          ],
          selectedGrnId,
          newGrn
        }
      };
    }
    case PURCHASE_ORDER_INVOICE_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        initialValues: {
          ...state.initialValues,
          invoices: action.data
        }
      };
    case PURCHASE_SUPPLIER_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        vendorLocations: action.data.locations.map(location => ({
          id: action.data.id,
          name: action.data.name,
          address: location
        })),
        initialValues: {
          ...state.initialValues,
          vendor: {
            id: action.data.id,
            name: action.data.name,
            // when load existing order we use vendor address from initial data, otherwise first available address
            address: state.initialValues.id ? state.initialValues.vendor.address : action.data.locations[0],
          },
          paymentTerms: action.data.paymentTerms && {
            id: action.data.paymentTerms.id,
            name: action.data.paymentTerms.name
          }
        }
      };
    case '@@router/LOCATION_CHANGE': {
      if (action.payload.pathname.includes('purchase/orders/new') && state.initialValues.id) {
        return {
          ...initialState,
          initialValues: {
            ...initialValues,
            vendor: {
              id: undefined,
              name: '',
              address: {}
            },
            billToCompany: state.initialValues.billToCompany,
            shipToCompany: state.initialValues.shipToCompany
          },
          contactUsers: state.contactUsers,
          companyLocations: state.companyLocations
        };
      }
      if (action.payload.pathname === 'purchase/orders') {
        return {
          ...initialState,
          initialValues
        };
      }
      return state;
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
