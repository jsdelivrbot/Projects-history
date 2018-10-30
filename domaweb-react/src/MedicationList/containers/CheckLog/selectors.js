import { createSelector } from 'reselect';

/**
 * Direct selector to the checkLog state domain
 */
const selectCheckLogDomain = () => (state) => state.getIn(['medicationList', 'checkLog']);

/**
 * Other specific selectors
 */


/**
 * Default selector used by CheckLog
 */

const makeSelectCheckLog = () => createSelector(
  selectCheckLogDomain(),
  (substate) => substate.toJS()
);

export default makeSelectCheckLog;
export {
  selectCheckLogDomain,
};
