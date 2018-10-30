import { createSelector } from 'reselect';

/**
 * Direct selector to the addNewMedication state domain
 */
const selectAddNewMedicationDomain = () => (state) => state.getIn(['medicationList', 'addNewMedication']);

//direct selector to list of all medication names
const selectMedicationDataset = () => state => state.getIn(['medicationList', 'addNewMedication', 'medication', 'list']).toJS();

/**
 * Other specific selectors
 */

const selectCurrentUser = () => state => state.getIn(['auth', 'userInfo', 'currentDomacareUser']).toJS();

const selectMedicationTemplate = (prop) => createSelector(
  selectAddNewMedicationDomain(),
  (substate) => substate.getIn(['form', 'fields', `${prop}`]),
);

const selectMedicationRequired = (prop) => createSelector(
  selectAddNewMedicationDomain(),
  (substate) => substate.getIn(['form', 'required', `${prop}`]),
);

const selectMedicationErrorMsg = (prop) => createSelector(
  selectAddNewMedicationDomain(),
  (substate) => substate.getIn(['form', 'errorMsg', `${prop}`]),
);

const selectFormFields = () => createSelector(
  selectAddNewMedicationDomain(),
  substate => substate.getIn(['form', 'fields']).toJS(),
);

const selectTemplateValue = (prop) => createSelector(
  selectMedicationTemplate(),
  substate => substate.get(prop),
);

const makeSelectMedicationTemplate = () => createSelector(
  selectMedicationTemplate(),
  (substate) => substate.toJS()
);

/**
 * Default selector used by AddNewMedication
 */

const makeSelectAddNewMedication = () => createSelector(
  selectAddNewMedicationDomain(),
  (substate) => substate.toJS()
);

export default makeSelectAddNewMedication;
export {
  selectAddNewMedicationDomain,
  makeSelectMedicationTemplate,
  selectTemplateValue,
  selectMedTemplateDirect,
  selectMedicationTemplate,
  selectMedicationDataset,
  selectCurrentUser,
  selectFormFields,
  selectMedicationRequired,
  selectMedicationErrorMsg,
};
