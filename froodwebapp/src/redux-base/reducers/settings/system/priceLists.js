import {
  PRICE_LISTS_GET,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  priceLists: [],
  loadingPage: false
};

export default function priceLists(state = initialState, action = {}) {
  switch (action.type) {
    case PRICE_LISTS_GET.REQUEST:
      return {
        ...state,
        loadingPage: true
      };
    case PRICE_LISTS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        priceLists: action.data
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false,
      };
    default:
      return state;
  }
}
