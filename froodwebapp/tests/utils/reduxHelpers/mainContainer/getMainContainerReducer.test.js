import {
  getMainContainerReducer,
  getMaxId,
  getMainContainerActions
} from 'utils';
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('getMainContainerReducer', () => {
  const initialState = {
    loadingPage: false,
    loadingTableData: false,
    loadingAutoComplete: false,
    data: {
      tableData: [],
      columns: [],
      stats: { },
      filters: [],
      totalRows: 0
    },
    activeFilterId: 'All',
    filterDeleted: false,
    limit: 40,
    offset: 0,
    autocomplete: [],
    keyword: ''
  };
  const actionsObj = getMainContainerActions('PriceLists');

  it('handles GET REQUEST with orderNo or id', () => {
    const action = {
      type: 'PriceLists_GET_REQUEST',
      limit: 'limit',
      offset: 'offset'
    };

    const resultState = cloneDeep(initialState);

    resultState.activeFilterId = 'All';
    resultState.loadingPage = true;
    resultState.loadingTableData = false;
    resultState.filterDeleted = false;
    resultState.limit = action.limit;
    resultState.offset = action.offset;

    expect(getMainContainerReducer(actionsObj)(initialState, action)).toEqual(resultState);
  });

  it('handles GET_WITH_FILTER_REQUEST', () => {
    const action = {
      payload: {
        limit: 90,
        offset: 15,
        id: 2
      },
      type: 'PriceLists_GET_WITH_FILTER_REQUEST'
    };
    const resultState = cloneDeep(initialState);

    resultState.activeFilterId = action.payload.id;
    resultState.limit = action.payload.limit;
    resultState.offset = action.payload.offset;
    resultState.loadingPage = false;
    resultState.loadingTableData = true;

    expect(getMainContainerReducer(actionsObj)(initialState, action)).toEqual(resultState);
  });

  it('handles FILTER_UPDATE REQUEST', () => {
    const action = {
      type: 'PriceLists_FILTER_UPDATE_REQUEST'
    };
    const resultState = cloneDeep(initialState);

    resultState.loadingPage = true;

    expect(getMainContainerReducer(actionsObj)(initialState, action)).toEqual(resultState);
  });

  it('handles FILTER_SAVE REQUEST', () => {
    const action = {
      type: 'PriceLists_FILTER_SAVE_REQUEST'
    };
    const resultState = cloneDeep(initialState);

    resultState.loadingPage = true;

    expect(getMainContainerReducer(actionsObj)(initialState, action)).toEqual(resultState);
  });

  it('handles FILTER_DELETE REQUEST', () => {
    const action = {
      type: 'PriceLists_FILTER_DELETE_REQUEST'
    };
    const resultState = cloneDeep(initialState);

    resultState.loadingPage = true;

    expect(getMainContainerReducer(actionsObj)(initialState, action)).toEqual(resultState);
  });

  it('handles UPDATE_DEFAULT_COLUMNS REQUEST', () => {
    const action = {
      type: 'PriceLists_UPDATE_DEFAULT_COLUMNS_REQUEST'
    };
    const resultState = cloneDeep(initialState);

    resultState.loadingPage = false;
    resultState.loadingTableData = true;

    expect(getMainContainerReducer(actionsObj)(initialState, action)).toEqual(resultState);
  });

  it('handles SEARCH REQUEST', () => {
    const action = {
      type: 'PriceLists_SEARCH_REQUEST',
      payload: ['Success']
    };
    const resultState = cloneDeep(initialState);

    resultState.loadingAutoComplete = false;
    resultState.autocomplete = [];
    resultState.keyword = ['Success'];

    expect(getMainContainerReducer(actionsObj)(initialState, action)).toEqual(resultState);
  });

  it('handles GET SUCCESS', () => {
    const action = {
      data: {
        tableData: ['Some data'],
        columns: ['Some columns'],
        stats: { first: 'just stats with one field' },
        filters: [{
          filterId: 1,
          filterValue: [{
            firstFilterValue: 'Category',
            firstFilterOffset: 60
          }, {
            firstFilterValue: 'Price Lists',
            firstFilterOffset: 45
          }]
        }, { filterId: 2,
          filterValue: [{
            secondFilterValue: 'Inventory',
            secondFilterOffset: 45
          }, {
            secondFilterValue: 'Users',
            secondFilterOffset: 30
          }]
        }],
        totalRows: 0
      },
      type: 'PriceLists_GET_SUCCESS'
    };
    const resultState = cloneDeep(initialState);

    resultState.loadingPage = false;
    resultState.loadingTableData = false;
    resultState.data = action.data;

    expect(getMainContainerReducer(actionsObj)(initialState, action)).toEqual(resultState);
  });

  it('handles GET_WITH_FILTER SUCCESS', () => {
    const action = {
      data: {
        tableData: ['Some data'],
        columns: ['Some columns'],
        stats: { first: 'just stats with one field' },
        filters: [{
          filterId: 1,
          filterValue: [{
            firstFilterValue: 'Category',
            firstFilterOffset: 60
          }, {
            firstFilterValue: 'Price Lists',
            firstFilterOffset: 45
          }]
        }, { filterId: 2,
          filterValue: [{
            secondFilterValue: 'Inventory',
            secondFilterOffset: 45
          }, {
            secondFilterValue: 'Users',
            secondFilterOffset: 30
          }]
        }],
        totalRows: 0
      },
      type: 'PriceLists_GET_WITH_FILTER_SUCCESS'
    };
    const resultState = cloneDeep(initialState);

    resultState.loadingTableData = false;
    resultState.data = action.data;

    expect(getMainContainerReducer(actionsObj)(initialState, action)).toEqual(resultState);
  });

  it('handles FILTER_UPDATE SUCCESS', () => {
    const action = {
      data: {
        tableData: ['Some data'],
        columns: ['Some columns'],
        stats: { first: 'just stats with one field' },
        filters: [{
          filterId: 1,
          filterValue: [{
            firstFilterValue: 'Category',
            firstFilterOffset: 60
          }, {
            firstFilterValue: 'Price Lists',
            firstFilterOffset: 45
          }]
        }, {
          filterId: 2,
          filterValue: [{
            secondFilterValue: 'Inventory',
            secondFilterOffset: 45
          }, {
            secondFilterValue: 'Users',
            secondFilterOffset: 30
          }]
        }],
        totalRows: 0
      },
      type: 'PriceLists_FILTER_UPDATE_SUCCESS'
    };
    const resultState = cloneDeep(initialState);

    resultState.loadingPage = false;
    resultState.loadingTableData = false;
    resultState.data = action.data;

    expect(getMainContainerReducer(actionsObj)(initialState, action)).toEqual(resultState);
  });

  it('handles FILTER_DELETE SUCCESS', () => {
    const action = {
      type: 'PriceLists_FILTER_DELETE_SUCCESS'
    };
    const resultState = cloneDeep(initialState);

    resultState.filterDeleted = true;

    expect(getMainContainerReducer(actionsObj)(initialState, action)).toEqual(resultState);
  });

  it('handles FILTER_SAVE_SUCCESS', () => {
    const action = {
      data: {
        tableData: ['Some data'],
        columns: ['Some columns'],
        stats: { first: 'just stats with one field' },
        filters: [{
          filterId: 1,
          filterValue: [{
            firstFilterValue: 'Category',
            firstFilterOffset: 60
          }, {
            firstFilterValue: 'Price Lists',
            firstFilterOffset: 45
          }]
        }, {
          filterId: 2,
          filterValue: [{
            secondFilterValue: 'Inventory',
            secondFilterOffset: 45
          }, {
            secondFilterValue: 'Users',
            secondFilterOffset: 30
          }]
        }],
        totalRows: 0
      },
      type: 'PriceLists_FILTER_SAVE_SUCCESS'
    };
    const resultState = cloneDeep(initialState);

    resultState.loadingPage = false;
    resultState.data = action.data;
    resultState.loadingTableData = false;
    resultState.activeFilterId = getMaxId(action.data.filters).toString();

    expect(getMainContainerReducer(actionsObj)(initialState, action)).toEqual(resultState);
  });

  it('handles SEARCH SUCCESS', () => {
    const action = {
      data: 'autocomplete',
      type: 'PriceLists_SEARCH_SUCCESS'
    };
    const resultState = cloneDeep(initialState);

    resultState.autocomplete = action.data;
    resultState.loadingAutoComplete = false;

    expect(getMainContainerReducer(actionsObj)(initialState, action)).toEqual(resultState);
  });

  it('handles ERROR', () => {
    const action = {
      type: 'ERROR'
    };

    const resultState = cloneDeep(initialState);
    resultState.loadingPage = false;
    resultState.loadingTableData = false;
    resultState.loadingAutoComplete = false;

    expect(getMainContainerReducer(actionsObj)(initialState, action)).toEqual(resultState);
  });

});
