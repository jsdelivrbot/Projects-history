import { createSelector } from 'reselect';

/**
 * Direct selector to the redirect state domain
 */
const selectRedirectDomain = () => (state) => state.get('redirect');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Redirect
 */

const makeSelectRedirect = () => createSelector(
  selectRedirectDomain(),
  (substate) => substate.toJS(),
);

export default makeSelectRedirect;
export {
  selectRedirectDomain,
};
