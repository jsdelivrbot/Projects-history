/*
 *
 * AdministeredMedication reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

import when from './dummyData';

const initialState = fromJS({
  temporary: when,
  whenNeeded: when,
});

function administeredMedicationReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default administeredMedicationReducer;
