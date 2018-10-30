// --------------------------- Reducer function --------------------------
import {
  ERROR,
  CLEAR_ERROR,
  REMOVE_WARNING_NOTIFICATION,
  ADD_WARNING_NOTIFICATIONS
} from 'redux-base/actions';
import { remove, uniqBy } from 'lodash';

const initialState = {
  errorMessage: null,
  errorStatus: null,
  warningNotifications: []
};

export default function error(state = initialState, action = {}) {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        errorMessage: action.data.message,
        errorStatus: action.data.status
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errorMessage: null,
        errorStatus: null
      };
    case ADD_WARNING_NOTIFICATIONS:
      return {
        ...state,
        warningNotifications: uniqBy(state.warningNotifications.concat(action.notifications), 'msg'),
      };
    case REMOVE_WARNING_NOTIFICATION:
      return {
        ...state,
        warningNotifications: remove(state.warningNotifications, wrn => wrn.id !== action.id),
      };
    default:
      return {
        ...state,
        errorMessage: null,
        errorStatus: null
      };
  }
}

