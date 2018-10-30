import {
  CUSTOMER_PROFILE_GET,
  CUSTOMER_PROFILE_UPDATE,
  CUSTOMER_ORDERS_GET,
  CUSTOMER_ADDRESSES_GET,
  CUSTOMER_ADDRESSES_SAVE,
  CUSTOMER_ADDRESSES_UPDATE,
  CUSTOMER_ADDRESSES_DELETE,
  CUSTOMER_CREDITS_GET,
  CUSTOMER_CREDITS_SAVE,
  STATE_CITIES_GET,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
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

export default function customerProfile(state = initialState, action = {}) {
  switch (action.type) {
    case CUSTOMER_PROFILE_GET.REQUEST:
    case CUSTOMER_PROFILE_UPDATE.REQUEST:
    case CUSTOMER_ADDRESSES_GET.REQUEST:
    case CUSTOMER_ADDRESSES_SAVE.REQUEST:
    case CUSTOMER_ADDRESSES_UPDATE.REQUEST:
    case CUSTOMER_ADDRESSES_DELETE.REQUEST:
    case CUSTOMER_ORDERS_GET.REQUEST:
    case CUSTOMER_CREDITS_GET.REQUEST:
    case CUSTOMER_CREDITS_SAVE.REQUEST:
    case STATE_CITIES_GET.REQUEST:
      return {
        ...state,
        loadingPage: true,
        needReloadAddresses: false
      };
    case CUSTOMER_PROFILE_GET.SUCCESS:
    case CUSTOMER_PROFILE_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        data: {
          ...action.data,
          phone: {
            number: action.data.phone,
            countryCode: action.data.countryCode
          }
        }
      };
    case CUSTOMER_ADDRESSES_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        addresses: action.data.addresses
      };
    case CUSTOMER_ORDERS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        orders: action.data
      };
    case CUSTOMER_ADDRESSES_SAVE.SUCCESS:
    case CUSTOMER_ADDRESSES_UPDATE.SUCCESS:
    case CUSTOMER_ADDRESSES_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadAddresses: true
      };
    case CUSTOMER_CREDITS_GET.SUCCESS:
    case CUSTOMER_CREDITS_SAVE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        credits: action.data,
      };

    case STATE_CITIES_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false
      };
    case '@@router/LOCATION_CHANGE':
      return initialState;
    case ERROR:
      return {
        ...state,
        loadingPage: false
      };
    default:
      return state;
  }
}
