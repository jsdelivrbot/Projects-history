import {
  PROMOTION_GET,
  PROMOTION_SAVE,
  PROMOTION_UPDATE,
  ITEM_INFO_GET,
  BUNDLE_INFO_GET,
  ERROR
} from 'redux-base/actions';

const initialState = {
  data: {
    id: null,
    qty: null,
    conditionQty: null,
    conditionValue: null,
    forFirstPurchase: false,
    forSingleTime: false,
    requireEndDate: false,
    requireMinumumPurchase: false,
    value: '',
    startDate: new Date(),
    endDate: new Date(),
    qualifyingOrder: null,
  },
  loadingPage: false,
};

export default function promotion(state = initialState, action = {}) {
  switch (action.type) {
    // REQUEST
    case PROMOTION_GET.REQUEST:
    case PROMOTION_SAVE.REQUEST:
    case PROMOTION_UPDATE.REQUEST:
    case ITEM_INFO_GET.REQUEST:
    case BUNDLE_INFO_GET.REQUEST:
      return {
        ...state,
        loadingPage: true,
      };

    // SUCCESS
    case PROMOTION_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        data: action.data
      };
    case PROMOTION_SAVE.SUCCESS:
    case PROMOTION_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        data: action.data
      };
    case ITEM_INFO_GET.SUCCESS:
    case BUNDLE_INFO_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false
      };
    case '@@router/LOCATION_CHANGE': {
      if (action.payload.pathname.includes('promotions/')) {
        return state;
      }
      return initialState;
    }
    default:
      return state;
  }
}
