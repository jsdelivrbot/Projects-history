// --------------------------- Reducer function --------------------------
import { ORDERS } from 'redux-base/actions';

const initialState = {
  loadingPage: false,
  downloadedItem: null
};

export default function download(state = initialState, action = {}) {
  switch (action.type) {
    case ORDERS.DOWNLOAD_ITEM.REQUEST:
      return {
        ...state,
        loadingPage: true
      };
    case ORDERS.DOWNLOAD_ITEM.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        downloadedItem: action.data,
      };
    default:
      return {
        initialState
      };
  }
}

