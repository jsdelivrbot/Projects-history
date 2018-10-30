import { createSelector } from 'reselect';

/**
 * Direct selector to the timeline state domain
 */
const selectTimelineDomain = () => state => state.get('TimelinePage');

const editTaskStatusSelector = () => createSelector(
  selectTimelineDomain(),
  taskEditStatus => taskEditStatus.get('taskEditStatus'),
);

const TaskDetailLoadingSelector = () => createSelector(
  selectTimelineDomain(),
  isTaskLoading => isTaskLoading.get('isTaskLoading'),
);

const TaskAddStatusSelector = () => createSelector(
  selectTimelineDomain(),
  taskAdd => taskAdd.get('taskAdd'),
);

const AvailableServicesSelector = () => createSelector(
  selectTimelineDomain(),
  availableservices => availableservices.get('availableservices'),
);

const TaskTypesSelector = () => createSelector(
  selectTimelineDomain(),
  tasktypeservices => tasktypeservices.get('tasktypeservices'),
);

const isTaskLoadingSelector = () => createSelector(
  selectTimelineDomain(),
  taskEditLoading => taskEditLoading.get('taskEditLoading'),
);

const TypedServicesSelector = () => createSelector(
  selectTimelineDomain(),
  taskEditLoading => taskEditLoading.get('typedServices'),
);

const AddedTaskSelector = () => createSelector(
  selectTimelineDomain(),
  customerResources => customerResources.get('addedTask'),
);

const TemplateRepetitionsSelector = () => createSelector(
  selectTimelineDomain(),
  customerResources => customerResources.get('templaterepetitions'),
);

const RepetitionViewsSelector = () => createSelector(
  selectTimelineDomain(),
  customerResources => customerResources.get('repetitionViews'),
);

const SpecialHolidaysSelector = () => createSelector(
  selectTimelineDomain(),
  customerResources => customerResources.get('specialholidays'),
);

export default selectTimelineDomain;
export {
  editTaskStatusSelector,
  TaskDetailLoadingSelector,
  TaskAddStatusSelector,
  AvailableServicesSelector,
  TaskTypesSelector,
  isTaskLoadingSelector,
  TypedServicesSelector,
  AddedTaskSelector,
  TemplateRepetitionsSelector,
  RepetitionViewsSelector,
  SpecialHolidaysSelector,
};
