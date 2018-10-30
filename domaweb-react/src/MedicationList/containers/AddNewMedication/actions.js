/*
 *
 * AddNewMedication actions
 *
 */

import {
  DEFAULT_ACTION,
  TEST,
  VALIDATE_ALL,
  SUBMIT,
  INIT_INFO,
} from './constants';
import ComposeAction from '../../../sharedComponents/Medication/utils';
import ComposeFormAction from '../../../sharedComponents/DynamicForm/utils';
import { stateName } from './stateName';
const formActions = new ComposeFormAction(stateName);
const medicationActions = new ComposeAction(stateName);

export const {
  getMedicationList, getMedicationListSuccess, getSingleMedication, getSingleMedicationSuccess,
} = medicationActions;

export const { compoundAction, updateFormValue, updateFormValueLazy, updateRequired, updateRequiredLazy, formatForm,
} = formActions;

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function test() {
  return {
    type: TEST,
  };
}

export function validateAll() {
  return {
    type: VALIDATE_ALL,
  };
}

export function submit(id) {
  return {
    type: SUBMIT,
    customerId: id,
  }
}

export function initInfo({ customerId }) {
  return {
    type: INIT_INFO,
    customer: customerId,
  }
}