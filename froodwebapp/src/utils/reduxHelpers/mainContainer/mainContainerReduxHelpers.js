import {
  createRequestTypes,
  createRequestFunc
} from '../reduxHelpers';

/**
 *
 * @param {string} pageName
 */
export const getMainContainerActions = pageName => ({
  GET: createRequestTypes(`${pageName}_GET`),
  GET_WITH_FILTER: createRequestTypes(`${pageName}_GET_WITH_FILTER`),
  SEARCH: createRequestTypes(`${pageName}_SEARCH`),
  FILTER_SAVE: createRequestTypes(`${pageName}_FILTER_SAVE`),
  FILTER_UPDATE: createRequestTypes(`${pageName}_FILTER_UPDATE`),
  FILTER_DELETE: createRequestTypes(`${pageName}_FILTER_DELETE`),
  DOWNLOAD_ITEM: createRequestTypes(`${pageName}_DOWNLOAD_ITEM`),
  UPDATE_DEFAULT_COLUMNS: createRequestTypes(`${pageName}_UPDATE_DEFAULT_COLUMNS`),
  CHANGE_ACTIVE_FILTER: createRequestTypes(`${pageName}_CHANGE_ACTIVE_FILTER`)
});

/**
 *
 * @param {object} ACTIONS
 * @param {string} enpointName
 */
export const getMainContainerActionsCreators = (ACTIONS, enpointName) => ({
  getAllItemsRequest: createRequestFunc(ACTIONS.GET, `${enpointName}`),
  getWithFilterRequest: createRequestFunc(ACTIONS.GET_WITH_FILTER, `${enpointName}`),
  saveFilterRequest: createRequestFunc(ACTIONS.FILTER_SAVE, `${enpointName}/filters`),
  updateFilterRequest: createRequestFunc(ACTIONS.FILTER_UPDATE, `${enpointName}/filters`),
  deleteFilterRequest: createRequestFunc(ACTIONS.FILTER_DELETE, 'filters/{id}'),
  searchRequest: createRequestFunc(ACTIONS.SEARCH, `${enpointName}/search?keyword={keyword}`),
  updateColumnsRequest: createRequestFunc(ACTIONS.UPDATE_DEFAULT_COLUMNS, `${enpointName}/columns`),
  changeActiveFilterId: data => ({ type: ACTIONS.CHANGE_ACTIVE_FILTER.REQUEST, ...data })
});

