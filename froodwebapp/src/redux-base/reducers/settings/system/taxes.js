import {
  TAX_CODES_GET,
  TAX_CATEGORIES_GET_PARALLEL,
  TAX_CODES_SAVE,
  TAX_CATEGORIES_SAVE,
  TAX_CODES_UPDATE,
  TAX_CATEGORIES_UPDATE,
  TAX_CODES_DELETE,
  TAX_CATEGORIES_DELETE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  taxCodes: [],
  taxCategories: [],
  loadingPage: false,
  needReloadTaxCodes: false,
  needReloadTaxCategories: false,
};

export default function taxes(state = initialState, action = {}) {
  switch (action.type) {
    case TAX_CODES_UPDATE.REQUEST:
    case TAX_CATEGORIES_UPDATE.REQUEST:
    case TAX_CODES_SAVE.REQUEST:
    case TAX_CATEGORIES_SAVE.REQUEST:
    case TAX_CATEGORIES_GET_PARALLEL.REQUEST:
    case TAX_CODES_GET.REQUEST:
      return {
        ...state,
        loadingPage: true
      };
    case TAX_CODES_DELETE.REQUEST:
      return {
        ...state,
        loadingPage: true
      };
    case TAX_CODES_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadTaxCodes: false,
        taxCodes: action.data
      };

    case TAX_CODES_SAVE.SUCCESS:
    case TAX_CODES_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadTaxCodes: true
      };

    case TAX_CODES_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadTaxCodes: true
      };

    case TAX_CATEGORIES_DELETE.REQUEST:
      return {
        ...state,
        loadingPage: true
      };
    case TAX_CATEGORIES_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadTaxCategories: false,
        taxCategories: action.data[0],
        taxCodes: action.data[1]
      };

    case TAX_CATEGORIES_SAVE.SUCCESS:
    case TAX_CATEGORIES_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadTaxCategories: true
      };

    case TAX_CATEGORIES_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadTaxCategories: true
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
