import { createSelector } from 'reselect';

/**
 * Direct selector to the addTask state domain
 */
const selectAddTaskDomain = () => (state) => state.get('addTask');


const customersListSelector = () => createSelector(
  selectAddTaskDomain(),
  (customers) => customers.get('customers')
);


const lazyLoadCustomersSelector = () => createSelector(
  selectAddTaskDomain(),
  (customerList) => customerList.get('customerList')
);


const taskTypesSelector = () => createSelector(
  selectAddTaskDomain(),
  (tasktypes) => tasktypes.get('tasktypes')
);


const taskAddStatusSelector = () => createSelector(
  selectAddTaskDomain(),
  taskAddStatus => taskAddStatus.get('taskAddStatus'),
);

const taskSaveBtnSelector = () => createSelector(
  selectAddTaskDomain(),
  taskSaveBtn => taskSaveBtn.get('taskSaveBtn'),
);

const availableServiceSelector = () => createSelector(
  selectAddTaskDomain(),
  availableservices => availableservices.get('availableservices'),
);

const isTaskTypeLoadingSelector = () => createSelector(
  selectAddTaskDomain(),
  isTaskTypeLoading => isTaskTypeLoading.get('isTaskTypeLoading'),
);

const newTaskTypesSelector = () => createSelector(
  selectAddTaskDomain(),
  newtasktypes => newtasktypes.get('newtasktypes'),
);

const getCustomersSelector = () => createSelector(
  selectAddTaskDomain(),
  lazycustomerslist => lazycustomerslist.get('lazycustomerslist'),
);

const isAvLoadingSelector = () => createSelector(
  selectAddTaskDomain(),
  isAvLoading => isAvLoading.get('isAvLoading'),
);

export default selectAddTaskDomain;
export {
  customersListSelector,
  taskTypesSelector,
  taskAddStatusSelector,
  taskSaveBtnSelector,
  availableServiceSelector,
  isTaskTypeLoadingSelector,
  newTaskTypesSelector,
  lazyLoadCustomersSelector,
  isAvLoadingSelector
};
