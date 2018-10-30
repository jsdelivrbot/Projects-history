import { createSelector } from 'reselect';

/**
 * Direct selector to the timeline state domain
 */
const selectTimelineDomain = () => state => state.get('TimelinePage');


const GetTaskDetailsSelector = () => createSelector(
  selectTimelineDomain(),
  taskdetails => taskdetails.get('taskdetails'),
);

const GetTaskTemplatesRepetitionsSelector = () => createSelector(
  selectTimelineDomain(),
  templaterepetitions => templaterepetitions.get('templaterepetitions'),
);

const GetAvailableServicesSelector = () => createSelector(
  selectTimelineDomain(),
  availableservices => availableservices.get('availableservices'),
);

const GetTaskTypeServicesSelector = () => createSelector(
  selectTimelineDomain(),
  tasktypeservices => tasktypeservices.get('tasktypeservices'),
);

const GetSpecialHolidaysSelector = () => createSelector(
  selectTimelineDomain(),
  specialholidays => specialholidays.get('specialholidays'),
);

const GetTaskMoveStatus = () => createSelector(
  selectTimelineDomain(),
  itemMovedStatus => itemMovedStatus.get('itemMovedStatus'),
);

const GetUpdateRepetitionStatus = () => createSelector(
  selectTimelineDomain(),
  updateRepetition => updateRepetition.get('updateRepetition'),
);
const TimelineLoadingStatus = () => createSelector(
  selectTimelineDomain(),
  timelineLoading => timelineLoading.get('timelineLoading'),
);

const employeeGroupLoadingSelector = () => createSelector(
  selectTimelineDomain(),
  employeeGroupLoading => employeeGroupLoading.get('employeeGroupLoading'),
);

const employeeItemLoadingSelector = () => createSelector(
  selectTimelineDomain(),
  employeeItemLoading => employeeItemLoading.get('employeeItemLoading'),
);

const groupGroupsLoadingSelector = () => createSelector(
  selectTimelineDomain(),
  groupGroupsLoading => groupGroupsLoading.get('groupGroupsLoading'),
);

const groupItemsLoadingSelector = () => createSelector(
  selectTimelineDomain(),
  groupItemsLoading => groupItemsLoading.get('groupItemsLoading'),
);

const customerResourceLoadingSelector = () => createSelector(
  selectTimelineDomain(),
  customerResourceLoading => customerResourceLoading.get('customerResourceLoading'),
);

const percentageLoadingSelector = () => createSelector(
  selectTimelineDomain(),
  percentage => percentage.get('percentage'),
);

const EmployeeItemsSelector = () => createSelector(
  selectTimelineDomain(),
  employeesItems => employeesItems.get('employeesItems'),
);

const SelectedCalendarItemSelector = () => createSelector(
  selectTimelineDomain(),
  employeesItems => employeesItems.get('selectedCalendarItem'),
);


export default selectTimelineDomain;
export {
  GetTaskDetailsSelector,
  GetTaskTemplatesRepetitionsSelector,
  GetAvailableServicesSelector,
  GetTaskTypeServicesSelector,
  GetSpecialHolidaysSelector,
  GetTaskMoveStatus,
  GetUpdateRepetitionStatus,
  TimelineLoadingStatus,
  employeeGroupLoadingSelector,
  employeeItemLoadingSelector,
  groupItemsLoadingSelector,
  groupGroupsLoadingSelector,
  customerResourceLoadingSelector,
  percentageLoadingSelector,
  EmployeeItemsSelector,
  SelectedCalendarItemSelector,
};
