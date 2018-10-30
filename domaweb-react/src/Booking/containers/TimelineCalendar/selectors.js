import { createSelector } from 'reselect';

/**
 * Direct selector to the timeline state domain
 */
const selectTimelineDomain = () => state => state.get('TimelinePage');

const activeTimetabID = () => (state, props) => props && props.params.timetabId;

const EmployeesGroupSelector = () => createSelector(
  selectTimelineDomain(),
  employeesGroup => employeesGroup.get('employeesGroup'),
);

const EmployeeItemsSelector = () => createSelector(
  selectTimelineDomain(),
  employeesItems => employeesItems.get('employeesItems'),
);

const GroupGroupSelector = () => createSelector(
  selectTimelineDomain(),
  groupGroups => groupGroups.get('groupGroups'),
);

const GroupItemsSelector = () => createSelector(
  selectTimelineDomain(),
  groupItems => groupItems.get('groupItems'),
);

const CustomerResourcesSelector = () => createSelector(
  selectTimelineDomain(),
  customerResources => customerResources.get('customerResources'),
);

export default selectTimelineDomain;
export {
  activeTimetabID,
  EmployeesGroupSelector,
  EmployeeItemsSelector,
  GroupGroupSelector,
  GroupItemsSelector,
  CustomerResourcesSelector,
};
