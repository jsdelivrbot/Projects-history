import { createSelector } from 'reselect';

/**
 * Direct selector to the AuthRequired state domain
 */
const selectAuthRequiredDomain = () => (state) => state.get('auth');

/**
 * Other specific selectors
 */
const selectAuth = () => (state) => state.getIn(['auth']).toJS();

const selectRouteDomain = () => (state) => state.get('route');

const makeSelectRoute = () => createSelector(
  selectRouteDomain(),
  substate => substate.toJS(),
);
/**
 * Default selector used by AuthRequired
 */

const makeSelectAuthRequired = () => createSelector(
  selectAuthRequiredDomain(),
  (substate) => substate.toJS()
);

export default makeSelectAuthRequired;
export {
  selectAuthRequiredDomain,
  makeSelectRoute,
  makeSelectAuthRequired,
};
