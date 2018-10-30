import {
  PURCHASE_SUPPLIER_INFO_GET,
  PURCHASE_SUPPLIER_SAVE,
  PURCHASE_SUPPLIER_UPDATE,
  PURCHASE_SUPPLIER_NOTES_GET,
  PURCHASE_SUPPLIER_NOTES_SAVE,
  PURCHASE_SUPPLIER_LOCATIONS_GET_PARALLEL,
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

// --------------------------- Reducer function --------------------------
const initialState = {
  data: {
    country: {},
    currency: {},
  },
  supplierCountryStates: [],
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

export default function supplier(state = initialState, action = {}) {
  switch (action.type) {
    case PURCHASE_SUPPLIER_INFO_GET.REQUEST:
    case PURCHASE_SUPPLIER_SAVE.REQUEST:
    case PURCHASE_SUPPLIER_UPDATE.REQUEST:
    case PURCHASE_SUPPLIER_NOTES_GET.REQUEST:
    case PURCHASE_SUPPLIER_NOTES_SAVE.REQUEST:
    case PURCHASE_SUPPLIER_LOCATIONS_GET_PARALLEL.REQUEST:
    case PURCHASE_SUPPLIER_LOCATIONS_SAVE.REQUEST:
    case PURCHASE_SUPPLIER_LOCATIONS_UPDATE.REQUEST:
    case PURCHASE_SUPPLIER_LOCATIONS_DELETE.REQUEST:
    case PURCHASE_SUPPLIER_CONTACTS_GET.REQUEST:
    case PURCHASE_SUPPLIER_CONTACTS_SAVE.REQUEST:
    case PURCHASE_SUPPLIER_CONTACTS_UPDATE.REQUEST:
    case PURCHASE_SUPPLIER_CONTACTS_DELETE.REQUEST:
    case PURCHASE_SUPPLIER_ORDERS_GET.REQUEST:
    case PURCHASE_SUPPLIER_PRICE_LIST_GET_PARALLEL.REQUEST:
    case PURCHASE_SUPPLIER_PRICE_LIST_UPDATE.REQUEST:
    case STATE_CITIES_GET.REQUEST:
      return {
        ...state,
        loadingPage: true,
        needReloadNotes: false,
        needReloadLocations: false,
        needReloadContacts: false,
        needReloadPriceLists: false
      };
    // supplier data
    case PURCHASE_SUPPLIER_INFO_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        data: action.data
      };
    case PURCHASE_SUPPLIER_SAVE.SUCCESS:
    case PURCHASE_SUPPLIER_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        data: action.data
      };
    // locations
    case PURCHASE_SUPPLIER_LOCATIONS_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        locations: action.data[0],
        supplierCountryStates: action.data[1]
      };
    case PURCHASE_SUPPLIER_LOCATIONS_SAVE.SUCCESS:
    case PURCHASE_SUPPLIER_LOCATIONS_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadLocations: true,
      };
    case PURCHASE_SUPPLIER_LOCATIONS_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadLocations: true,
        needReloadContacts: true,
      };
    // contacts
    case PURCHASE_SUPPLIER_CONTACTS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        contacts: action.data,
      };
    case PURCHASE_SUPPLIER_CONTACTS_SAVE.SUCCESS:
    case PURCHASE_SUPPLIER_CONTACTS_UPDATE.SUCCESS:
    case PURCHASE_SUPPLIER_CONTACTS_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadContacts: true,
      };
    // orders
    case PURCHASE_SUPPLIER_ORDERS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        orders: action.data,
      };
    // price lists
    case PURCHASE_SUPPLIER_PRICE_LIST_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        priceListData: action.data[0],
        priceLists: action.data[1]
      };
    case PURCHASE_SUPPLIER_PRICE_LIST_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadPriceLists: true
      };
    // notes
    case PURCHASE_SUPPLIER_NOTES_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        notes: action.data,
      };
    case PURCHASE_SUPPLIER_NOTES_SAVE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadNotes: true
      };
    case STATE_CITIES_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false,
      };
    case '@@router/LOCATION_CHANGE': {
      if (action.payload.pathname.includes('suppliers/new')) {
        return initialState;
      }
      return state;
    }
    default:
      return state;
  }
}
