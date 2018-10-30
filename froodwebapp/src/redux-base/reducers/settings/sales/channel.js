import {
  CHANNEL_GET_PARALLEL,
  CHANNEL_UPDATE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  data: {},
  priceLists: [],
  loadingPage: false
};

export default function channel(state = initialState, action = {}) {
  switch (action.type) {
    case CHANNEL_GET_PARALLEL.REQUEST:
    case CHANNEL_UPDATE.REQUEST:
      return {
        ...state,
        loadingPage: true,
      };
    case CHANNEL_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        data: action.data[0],
        priceLists: action.data[1]
      };
    case CHANNEL_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
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
