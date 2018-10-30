import { createSelector } from 'reselect';

/**
 * Direct selector to the currentMedication state domain
 */
const selectCustomerMedicationDomain = () => (state) => state.getIn(['medicationList', 'customerMedication']);

/**
 * Other specific selectors
 */


/**
 * Default selector used by CurrentMedication
 */

const makeSelectCustomerMedication = () => createSelector(
  selectCustomerMedicationDomain(),
  (substate) => substate.toJS()
);

export default makeSelectCustomerMedication;
export {
  selectCustomerMedicationDomain,
};
