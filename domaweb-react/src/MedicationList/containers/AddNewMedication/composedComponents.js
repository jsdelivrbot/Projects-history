import React from 'react';
import DynamicForm from '../../../sharedComponents/DynamicForm';
import RequiredWrapper from '../../../sharedComponents/DynamicForm/RequiredWrapper';
import ErrorMsg from '../../../sharedComponents/DynamicForm/ErrorMsg';
import AutoComplete from '../../../sharedComponents/DomaAutocomplete';
import TextField from '../../../sharedComponents/TextFieldGeneric';
import MedicationWrapperHoc from '../../../sharedComponents/Medication';
import DatePicker from '../../../sharedComponents/DomaDatePicker';
import RadioGroup from '../../../sharedComponents/RadioGroup';
import { selectMedicationDataset, selectMedicationTemplate,
  selectAddNewMedicationDomain, selectMedicationRequired, selectMedicationErrorMsg, } from './selectors';
import { updateFormValue, updateFormValueLazy, updateRequired, updateRequiredLazy, formatForm, compoundAction,
} from './actions';
import { compose } from 'recompose'


/** Higher order component to provide form methods the right name for updating stuff */
function dispatchHOF(name) {
  return function mapDispatchToProps(dispatch) {
    return {
      submit: ({ value }) => dispatch(updateFormValue(name, value)),
      onChange: (props) => dispatch(updateFormValue(name, props)),
    };
  };
}

function compoundDispatch() {
  return function mapDispatchToProps(dispatch) {
    return {
      onChange: (props) => dispatch(compoundAction(props)),
    };
  };
}

/** Wrapper to wrap components into DynamicForm */
export const FormWrapper = (name) => (component) =>
  DynamicForm(name, selectMedicationTemplate, dispatchHOF(name))(component);

export const RequiredEnhancer = (name) => (component) => 
RequiredWrapper(name, selectMedicationRequired)(FormWrapper(name)(component));

export const compoundWrapper = (name) => (component) =>
  DynamicForm(name, selectMedicationTemplate, compoundDispatch())(component);

export const RequiredCompoundEnhancer = (name) => (component) =>
RequiredWrapper(name, selectMedicationRequired)(compoundWrapper(name)(component));

export const ErrorWrapper = (name) => (component) =>
ErrorMsg(name, selectMedicationErrorMsg)(RequiredEnhancer(name)(component));

/** First wrap autocomplete into dynamicForm, then pass it the list of medications
 * by wrapping it into MedicationWrapperHoc
 */
export const HydratedName = RequiredCompoundEnhancer('name')(AutoComplete);
export const Name = MedicationWrapperHoc(selectMedicationDataset, null)(HydratedName);


//the rest is business as usual. Just a name and a compoent required
export const Dosage = ErrorWrapper('dosage')(TextField);
export const D1 = ErrorWrapper('d1')(TextField);
export const D2 = ErrorWrapper('d2')(TextField);
export const D3 = ErrorWrapper('d3')(TextField);
export const D4 = ErrorWrapper('d4')(TextField);
export const D5 = ErrorWrapper('d5')(TextField);
export const Purpose = ErrorWrapper('purpose')(TextField);
export const Notice = ErrorWrapper('notice')(TextField);
export const StartDate = ErrorWrapper('startDate')(DatePicker);
export const EndDate = ErrorWrapper('endDate')(DatePicker);
export const Type = ErrorWrapper('type')(RadioGroup);
export const Dispenser = ErrorWrapper('inPillDispenser')(RadioGroup);
