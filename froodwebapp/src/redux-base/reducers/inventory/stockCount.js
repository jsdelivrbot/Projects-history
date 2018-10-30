import {
  STOCK_COUNT_WAREHOUSES_USERS_GET_PARALLEL,
  STOCK_COUNT_GET,
  STOCK_COUNT_SAVE,
  STOCK_COUNT_START_UPDATE,
  STOCK_COUNT_FINALIZE_UPDATE,
  STOCK_COUNT_DETAIL_CONFIRM_UPDATE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  users: [],
  warehouses: [],
  stockCount: {},
  loadingPage: false,
  needReload: false,
  needRedirect: false
};

export default function stockCount(state = initialState, action = {}) {
  switch (action.type) {
    case STOCK_COUNT_WAREHOUSES_USERS_GET_PARALLEL.REQUEST:
    case STOCK_COUNT_GET.REQUEST:
    case STOCK_COUNT_SAVE.REQUEST:
    case STOCK_COUNT_START_UPDATE.REQUEST:
    case STOCK_COUNT_FINALIZE_UPDATE.REQUEST:
    case STOCK_COUNT_DETAIL_CONFIRM_UPDATE.REQUEST:
      return {
        ...state,
        loadingPage: true,
        needReload: false,
        needRedirect: false,
      };
    case STOCK_COUNT_WAREHOUSES_USERS_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        users: action.data[0],
        warehouses: action.data[1],
      };
    case STOCK_COUNT_GET.SUCCESS:
    case STOCK_COUNT_START_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        stockCount: action.data,
        users: [{
          id: action.data.assignedTo,
          name: action.data.assignedToName
        }],
        warehouses: [{
          id: action.data.warehouseId,
          name: action.data.warehouseName,
        }]
      };
    case STOCK_COUNT_SAVE.SUCCESS:
    case STOCK_COUNT_FINALIZE_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needRedirect: true,
      };
    case STOCK_COUNT_DETAIL_CONFIRM_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReload: true
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false
      };
    case '@@router/LOCATION_CHANGE': {
      if (action.payload.pathname.includes('stock-count/')) {
        return state;
      }
      return initialState;
    }
    default:
      return state;
  }
}
