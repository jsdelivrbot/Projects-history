import { createSelector } from 'reselect';

/**
 * Direct selector to the allergies state domain
 */
const selectAllergiesDomain = () => (state) => state.getIn(['medicationList', 'allergies']);

/**
 * Other specific selectors
 */


/**
 * Default selector used by Allergies
 */

const makeSelectAllergies = () => createSelector(
  selectAllergiesDomain(),
  (substate) => substate.toJS()
);

export default makeSelectAllergies;
export {
  selectAllergiesDomain,
};
