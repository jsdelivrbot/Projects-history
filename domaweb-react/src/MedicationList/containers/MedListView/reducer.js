/*
 *
 * MedListView reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TOGGLE_MED_VIEW,
  SET_MODAL_STATUS,
  RESET_TABS,
  SET_ADD_NEW_MODAL_STATUS,
  TOGGLE_CHECK_LOG,
} from './constants';

const initialState = fromJS({
  modal: false,
  addNewModal: false,
  tabs: {
    currentMedication: true,
    allergies: false,
    administered: false,
  },
  history: false,
  log: false,
});

function medListViewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_STATUS:
      return state.set('modal', action.data);
    case RESET_TABS:
      return state.set('tabs', fromJS(action.data));
    case SET_ADD_NEW_MODAL_STATUS:
      return state.set('addNewModal', action.data);
    case TOGGLE_CHECK_LOG:
      return state.set('log', action.data);
    default:
      return state;
  }
}

export default medListViewReducer;
