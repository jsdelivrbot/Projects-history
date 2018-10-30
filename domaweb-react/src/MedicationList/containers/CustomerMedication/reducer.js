/*
 *
 * CurrentMedication reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_MEDICATION_LIST_SUCCESS,
  SET_CONTINUOUS,
  SET_TEMPORARY,
  SET_WHEN_NEEDED,
  SET_COMING,
} from './constants';

const initialState = fromJS({
  list: [],
  continuous: [1],
  temporary: [],
  whenNeeded: [],
  coming: [],
});

function currentMedicationReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_MEDICATION_LIST_SUCCESS:
      return state.set('list', fromJS(action.data));
    case SET_CONTINUOUS:
      return state.set('continuous', fromJS(action.data));
    case SET_TEMPORARY:
      return state.set('temporary', fromJS(action.data));
    case SET_WHEN_NEEDED:
      return state.set('whenNeeded', fromJS(action.data));
    case SET_COMING:
      return state.set('coming', fromJS(action.data));
    default:
      return state;
  }
}

export default currentMedicationReducer;
