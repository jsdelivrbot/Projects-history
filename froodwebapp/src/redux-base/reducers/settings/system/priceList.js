import {
  PRICE_LIST_GET,
  PRICE_LIST_SAVE,
  PRICE_LIST_UPDATE,
  PRICE_LIST_SKU_SAVE,
  PRICE_LIST_SKU_UPDATE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  skuList: [],
  data: {
    type: 1,
    isTaxIncl: true
  },
  loadingPage: false,
  needReloadSkuList: false
};

export default function priceLists(state = initialState, action = {}) {
  switch (action.type) {
    case PRICE_LIST_GET.REQUEST:
    case PRICE_LIST_SAVE.REQUEST:
    case PRICE_LIST_UPDATE.REQUEST:
    case PRICE_LIST_SKU_SAVE.REQUEST:
    case PRICE_LIST_SKU_UPDATE.REQUEST:
      return {
        ...state,
        loadingPage: true,
        needReloadSkuList: false
      };
    case PRICE_LIST_GET.SUCCESS:
      return {
        ...state,
        needReloadSkuList: false,
        loadingPage: false,
        data: action.data,
        skuList: action.data.list
      };
    case PRICE_LIST_SAVE.SUCCESS:
    case PRICE_LIST_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadSkuList: false,
        data: action.data,
        skuList: action.data.list,
      };
    case PRICE_LIST_SKU_SAVE.SUCCESS:
    case PRICE_LIST_SKU_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadSkuList: true
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false,
        needReloadSkuList: false
      };
    case '@@router/LOCATION_CHANGE': {
      if (action.payload.pathname.includes('price-lists/')) {
        return state;
      }
      return initialState;
    }
    default:
      return state;
  }
}
