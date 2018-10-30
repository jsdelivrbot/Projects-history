/*
 *
 * AddNewMedication reducer
 *
 */

import { fromJS } from 'immutable';
import { composeString, ComposeConstant } from './utils';

function formReducerCreator(stateName, schema = {}) {
  const nullify = (obj) => {
    const newObj = {};
    for (let i of Object.keys(obj)) {
      newObj[i] = null;
    }
    return newObj;
  };
  const initialState = fromJS({
    fields: schema,
    required: nullify(schema),
    errorMsg: nullify(schema),
  });

  const constants = new ComposeConstant(stateName);
  const {
    UPDATE_FORM_VALUE,
    UPDATE_FORM_VALUE_LAZY,
    UPDATE_REQUIRED_FIELD,
    UPDATE_REQUIRED_FIELD_LAZY,
    FORMAT_FORM,
    COMPOUND_ACTION,
  } = constants;

  return function formReducer(state = initialState, action) {
    switch (action.type) {
      case UPDATE_FORM_VALUE:
        return state.setIn(['fields', `${action.fragment}`], fromJS(action.value));
      case UPDATE_FORM_VALUE_LAZY:
        return state.setIn(['fields', `${action.fragment}`], fromJS(action.value));
      case UPDATE_REQUIRED_FIELD:
        return state.setIn(['required', `${action.fragment}`], action.value);
      case UPDATE_REQUIRED_FIELD_LAZY:
        return state.setIn(['required', `${action.fragment}`], action.value);
      case FORMAT_FORM:
        return state.set('fields', fromJS(action.data));
      case COMPOUND_ACTION:
        return state;
      default:
        return state;
    }
  };
}

export default formReducerCreator;
