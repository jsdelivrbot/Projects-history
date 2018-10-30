import {
  PROD_CAT_GET,
  PROD_CAT_SAVE,
  PROD_CAT_UPDATE,
  PROD_CAT_DELETE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  data: [],
  loadingPage: false,
  needReloadProductCategories: false
};

export default function productCategories(state = initialState, action = {}) {
  switch (action.type) {
    case PROD_CAT_GET.REQUEST:
    case PROD_CAT_SAVE.REQUEST:
    case PROD_CAT_UPDATE.REQUEST:
    case PROD_CAT_DELETE.REQUEST:
      return {
        ...state,
        loadingPage: true,
        needReloadProductCategories: false,
      };
    case PROD_CAT_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        data: action.data,
      };
    case PROD_CAT_SAVE.SUCCESS:
    case PROD_CAT_UPDATE.SUCCESS:
    case PROD_CAT_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadProductCategories: true,
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
