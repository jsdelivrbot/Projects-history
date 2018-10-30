/*
 *
 * CheckLog reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

import data from './dummyData';

const initialState = fromJS({
  log: data,
});

function checkLogReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default checkLogReducer;
