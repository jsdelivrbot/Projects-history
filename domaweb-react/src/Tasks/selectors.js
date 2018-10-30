import { createSelector } from 'reselect';

const selectTask = () => state => state.get('tasks');

const getTasksList = () => createSelector(
  selectTask(),
  tasks => tasks.get('tasks'),
);

const getTaskDetail = () => createSelector(
  selectTask(),
  tasks => tasks.get('taskDetail'),
);

const getshowLoadingBttn = () => createSelector(
  selectTask(),
  tasks => tasks.get('showLoadingBttn'),
);

export {
  getTasksList,
  getTaskDetail,
  getshowLoadingBttn,
};
