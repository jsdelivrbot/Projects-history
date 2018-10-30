import {
  CUSTOMER_SAVE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  loadingPage: false,
  data: null
};

export default function customer(state = initialState, action = {}) {
  switch (action.type) {
    case CUSTOMER_SAVE.REQUEST:
      return {
        ...state,
        loadingPage: true,
        loadingAutoComplete: false,
        successSave: false
      };
    case CUSTOMER_SAVE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        data: action.data,
      };
    case '@@router/LOCATION_CHANGE':
      return initialState;
    case ERROR:
      return {
        ...state,
        loadingPage: false,
      };
    default:
      return state;
  }
}
