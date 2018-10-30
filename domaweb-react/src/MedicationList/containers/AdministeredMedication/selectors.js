import { createSelector } from 'reselect';

/**
 * Direct selector to the administeredMedication state domain
 */
const selectAdministeredMedicationDomain = () => (state) =>
  state.getIn(['medicationList', 'administeredMedication']);

/**
 * Other specific selectors
 */


/**
 * Default selector used by AdministeredMedication
 */

const makeSelectAdministeredMedication = () => createSelector(
  selectAdministeredMedicationDomain(),
  (substate) => substate.toJS()
);

export default makeSelectAdministeredMedication;
export {
  selectAdministeredMedicationDomain,
};
