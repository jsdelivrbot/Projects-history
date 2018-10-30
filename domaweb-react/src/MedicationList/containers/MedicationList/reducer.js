/*
 *
 * MedicationList reducer
 *
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import {
  DEFAULT_ACTION,
} from './constants';
import viewReducer from '../MedListView/reducer';
import customerMedicationReducer from '../CustomerMedication/reducer';
import addNewMedicationReducer from '../AddNewMedication/reducer';
import allergiesReducer from '../Allergies/reducer';
import administeredMedicationReducer from '../AdministeredMedication/reducer';
import checkLogReducer from '../CheckLog/reducer';

/*const initialState = fromJS({
  modalState: false, 
});*/

/*function medicationListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}*/

const medicationListReducer = combineReducers({
  view: viewReducer,
  customerMedication: customerMedicationReducer,
  addNewMedication: addNewMedicationReducer,
  allergies: allergiesReducer,
  administeredMedication: administeredMedicationReducer,
  checkLog: checkLogReducer,
});

export default medicationListReducer;
