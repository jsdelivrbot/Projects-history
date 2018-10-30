import { sortBy } from 'lodash';

/**
 *
 * @param {object} state
 * @param {string} reducerName
 */
export default (state, reducerName) => ({
  // triggers
  loadingPage: state[reducerName].loadingPage,
  loadingTableData: state[reducerName].loadingTableData,
  loadingAutoComplete: state[reducerName].loadingAutoComplete,

  // data
  data: state[reducerName].data.tableData,
  filters: state[reducerName].data.filters,
  columns: sortBy(state[reducerName].data.columns, 'order'),
  stats: state[reducerName].data.stats,
  totalRows: state[reducerName].data.totalRows,

  // state
  limit: state[reducerName].limit,
  offset: state[reducerName].offset,
  keyword: state[reducerName].keyword,
  activeFilterId: state[reducerName].activeFilterId,
  filterDeleted: state[reducerName].filterDeleted,

  // autocomplete
  autocomplete: state[reducerName].autocomplete
});
