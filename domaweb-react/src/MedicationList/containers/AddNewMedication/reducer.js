/*
 *
 * AddNewMedication reducer
 *
 */

import { fromJS, Record } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

import medicationReducerCreator from '../../../sharedComponents/Medication/reducer';
import formReducerCreator from '../../../sharedComponents/DynamicForm/reducer';
import { combineReducers } from 'redux-immutable';
import { stateName } from './stateName';

const schema = {
  timeOfAddition: null,
  addingUserId: null,
  endDate: null,
  singleDoseDistribution: false,
  name: null,
  addingUser: null,
  d1: "",
  deletingUserId: null,
  d2: "",
  d3: "",
  d4: "",
  startDate: null,
  d5: "",
  timeOfDeletion: null,
  deletingUser: null,
  deletedBecauseModified: null,
  inPillDispenser: false,
  dosage: "",
  notice: "",
  deleted: null,
  customerId: null,
  type: 'TEMPORARY',
  id: null,
  medicationCode: null,
  adderInfo: null,
  purpose: "",
  customer: null,
};
const formReducer = formReducerCreator(stateName, schema);
//export const stateName = 'ADD_NEW_MEDICATION';

/*const initialState = fromJS({
  template: formReducer
});*/

/*function addNewMedicationFormReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}*/

const medicationReducer = medicationReducerCreator(stateName);

const addNewMedicationReducer = combineReducers({
  form: formReducer,
  medication: medicationReducer,
  //list: medicationListReducer,
});

export default addNewMedicationReducer;
