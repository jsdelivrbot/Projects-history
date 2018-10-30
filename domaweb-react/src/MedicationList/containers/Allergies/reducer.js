/*
 *
 * Allergies reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
  drugs: ['many drugs', 'burana'],
  other: ['tortoise shell'],
});

function allergiesReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default allergiesReducer;
