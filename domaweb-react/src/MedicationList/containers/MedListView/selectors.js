import { createSelector } from 'reselect';

/**
 * Direct selector to the medListView state domain
 */
const selectMedListViewDomain = () => (state) => state.getIn(['medicationList', 'view']);

/**
 * Other specific selectors
 */

const selectTabs = () => createSelector(
  selectMedListViewDomain(),
  (substate) => substate.get('tabs'),
);

const selectCheckLog = () => createSelector(
  selectMedListViewDomain(),
  (substate) => substate.get('log'),
);

const makeSelectTabs = () => createSelector(
  selectTabs(),
  substate => substate.toJS(),
);

const selectAddNewModal = () => createSelector(
  selectMedListViewDomain(),
  (substate) => substate.get('addNewModal'),
);

const selectMainModal = () => createSelector(
  selectMedListViewDomain(),
  (substate) => substate.get('modal'),
);
/**
 * Default selector used by MedListView
 */

const makeSelectMedListView = () => createSelector(
  selectMedListViewDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMedListView;
export {
  selectMedListViewDomain,
  makeSelectMedListView,
  selectTabs,
  makeSelectTabs,
  selectAddNewModal,
  selectCheckLog,
  selectMainModal,
};
