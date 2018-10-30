import { createSelector } from 'reselect';

/**
 * Direct selector to the errorContainer state domain
 */
const selectErrorContainerDomain = () => (state) => state.get('errorContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ErrorContainer
 */

const makeSelectErrorContainer = () => createSelector(
  selectErrorContainerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectErrorContainer;
export {
  selectErrorContainerDomain,
};
