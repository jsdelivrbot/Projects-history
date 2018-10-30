import {
  NUMERIC_SAVE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  data: [],
  loading: false
};

export default function numeric(state = initialState, action = {}) {
  switch (action.type) {
    case NUMERIC_SAVE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NUMERIC_SAVE.SUCCESS:
      return {
        ...state,
        loading: false
      };
    case ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
