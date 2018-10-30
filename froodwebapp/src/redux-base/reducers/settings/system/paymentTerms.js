import {
  PAY_TERMS_GET_PARALLEL,
  PAY_TERMS_SAVE,
  PAY_TERMS_UPDATE,
  PAY_TERMS_DELETE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  data: [],
  from: [],
  loadingPage: false,
  needReloadPayTerms: false
};

export default function paymentTerms(state = initialState, action = {}) {
  switch (action.type) {
    case PAY_TERMS_GET_PARALLEL.REQUEST:
    case PAY_TERMS_UPDATE.REQUEST:
    case PAY_TERMS_DELETE.REQUEST:
      return {
        ...state,
        loadingPage: true
      };
    case PAY_TERMS_SAVE.REQUEST:
      return {
        ...state,
        loadingPage: true,
        needReloadPayTerms: false
      };
    case PAY_TERMS_SAVE.SUCCESS:
    case PAY_TERMS_DELETE.SUCCESS:
    case PAY_TERMS_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadPayTerms: true
      };

    case PAY_TERMS_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadPayTerms: false,
        data: action.data[0],
        from: action.data[1].from
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
