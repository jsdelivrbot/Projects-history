import {
  getMainContainerState
} from 'utils';

const { describe, it, expect } = global;

describe('getMainContainerState', () => {
  it('changes state', () => {
    const reducerName = 'categoriesReducer';
    const state = {
      categoriesReducer: {
        loadingPage: 'loadingPage',
        loadingTableData: 'loadingTableData',
        loadingAutoComplete: 'loadingAutoComplete',
        data: {
          tableData: 'data',
          filters: 'filters',
          columns: ['Bcolumns', 'Acolumns'],
          stats: 'stats',
          totalRows: 16
        },
        limit: 'limit',
        offset: 'offset',
        keyword: 'keyword',
        activeFilterId: 'activeFilterId',
        filterDeleted: 'filterDeleted',
        autocomplete: 'autocomplete'
      }
    };
    const resultObj = {
      activeFilterId: 'activeFilterId',
      autocomplete: 'autocomplete',
      columns: ['Bcolumns', 'Acolumns'],
      data: 'data',
      filterDeleted: 'filterDeleted',
      filters: 'filters',
      keyword: 'keyword',
      limit: 'limit',
      loadingAutoComplete: 'loadingAutoComplete',
      loadingPage: 'loadingPage',
      loadingTableData: 'loadingTableData',
      offset: 'offset',
      stats: 'stats',
      totalRows: 16
    };

    expect(getMainContainerState(state, reducerName)).toEqual(resultObj);
  });
});

