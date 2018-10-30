import {
  SKU_WAREHOUSE_BIN_GET,
  SKU_BATCHES_GET_WITH_FILTER,
  ADJUSTMENT_SAVE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  loadingPage: false,
  warehouses: [],
  bins: [],
  batches: []
};

export default function adjustment(state = initialState, action = {}) {
  switch (action.type) {
    case SKU_WAREHOUSE_BIN_GET.REQUEST:
    case SKU_BATCHES_GET_WITH_FILTER.REQUEST:
    case ADJUSTMENT_SAVE.REQUEST:
      return {
        ...state,
        loadingPage: true,
      };
    case SKU_WAREHOUSE_BIN_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        warehouses: action.data.warehouses,
        bins: action.data.bins,
      };
    case SKU_BATCHES_GET_WITH_FILTER.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        batches: action.data,
      };
    case ADJUSTMENT_SAVE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false
      };
    default:
      return state;
  }
}
