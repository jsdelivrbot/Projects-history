import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
const selectLoginDomain = () => (state) => state.get('login');

/**
 * Other specific selectors
 */

const selectRouteDomain = () => (state) => state.get('route');

const makeSelectRoute = () => createSelector(
  selectRouteDomain(),
  substate => substate.toJS(),
);
/**
 * Default selector used by Login
 */

const makeSelectLogin = () => createSelector(
  selectLoginDomain(),
  (substate) => substate.toJS()
);

export default makeSelectLogin;
export {
  selectLoginDomain,
  selectRouteDomain,
  makeSelectRoute,
};
