import {
  CHANNELS_GET,
  CHANNEL_UPDATE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  data: [],
  loadingPage: false
};

export default function channels(state = initialState, action = {}) {
  switch (action.type) {
    case CHANNELS_GET.REQUEST:
    case CHANNEL_UPDATE.REQUEST:
      return {
        ...state,
        loadingPage: true,
      };
    case CHANNELS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        data: action.data
      };
    case CHANNEL_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        data: state.data.map(item => (item.id === action.data.id ? action.data : item))
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
