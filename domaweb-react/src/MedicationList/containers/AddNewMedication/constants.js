import { ComposeConstant } from "../../../sharedComponents/Medication/utils";
import { ComposeConstant as ComposeFormConstant } from '../../../sharedComponents/DynamicForm/utils';
import { stateName } from "./stateName";

/*
 *
 * AddNewMedication constants
 *
 */
const medicationConstants = new ComposeConstant(stateName);
const formConstants = new ComposeFormConstant(stateName);

export const {
  GET_MEDICATION_LIST,
  GET_MEDICATION_LIST_SUCCESS,
  GET_SINGLE_MEDICATION,
  GET_SINGLE_MEDICATION_SUCCESS,
} = medicationConstants;

export const {
  UPDATE_FORM_VALUE,
  UPDATE_FORM_VALUE_LAZY,
  UPDATE_REQUIRED_FIELD,
  UPDATE_REQUIRED_FIELD_LAZY,
  FORMAT_FORM,
  COMPOUND_ACTION,
} = formConstants;

export const DEFAULT_ACTION = 'app/AddNewMedication/DEFAULT_ACTION';
export const TEST = 'ADD_NEW/TEST';
export const VALIDATE_ALL = 'app/AddNewMedication/VALIDATE_ALL';
export const SUBMIT = 'app/AddNewMedication/SUBMIT';
export const INIT_INFO = 'app/AddNewMedication/INIT_INFO';
