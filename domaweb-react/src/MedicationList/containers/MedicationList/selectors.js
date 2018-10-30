import { createSelector } from 'reselect';

/**
 * Direct selector to the medicationList state domain
 */
const selectMedicationListDomain = () => (state) => state.get('medicationList');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MedicationList
 */

const makeSelectMedicationList = () => createSelector(
  selectMedicationListDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMedicationList;
export {
  selectMedicationListDomain,
};
