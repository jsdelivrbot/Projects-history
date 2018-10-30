/*
 *
 * AddNewMedication reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';
import { composeString, ComposeConstant } from './utils';

const initialState = fromJS({
  list: [],
  singleMedication: {},
  atcList: [],
});

function medicationReducerCreator(stateName) {
  const constants = new ComposeConstant(stateName);
  const {
    GET_MEDICATION_LIST,
    GET_MEDICATION_LIST_SUCCESS,
    GET_SINGLE_MEDICATION,
    GET_SINGLE_MEDICATION_SUCCESS,
    GET_ATC,
    GET_ATC_SUCCESS,
  } = constants;
  /*const curriedCompose = (name) => composeString(stateName, name);
  const GET_MEDICATION_LIST = curriedCompose('GET_MEDICATION_LIST');
  const GET_SINGLE_MEDICATION = curriedCompose('GET_SINGLE_MEDICATION');

  const GET_SINGLE_MEDICATION_SUCCESS = curriedCompose('GET_SINGLE_MEDICATION_SUCCESS');
  const GET_MEDICATION_LIST_SUCCESS = curriedCompose('GET_MEDICATION_LIST_SUCCESS');*/
  return function medicationReducer(state = initialState, action) {
    switch (action.type) {
      case GET_MEDICATION_LIST:
        return state;
      case GET_SINGLE_MEDICATION:
        return state;
      case GET_SINGLE_MEDICATION_SUCCESS:
        return state.set('singleMedication', fromJS(action.data));
      case GET_MEDICATION_LIST_SUCCESS:
        return state.set('list', fromJS(action.data));
      case GET_ATC:
        return state;
      case GET_ATC_SUCCESS:
        return state.set('atcList', fromJS(action.data));
      default:
        return state;
    }
  };
}

export default medicationReducerCreator;
