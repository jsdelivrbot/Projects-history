/* eslint-disable import/prefer-default-export */
import { getMaxId } from 'utils';
import { ERROR } from 'redux-base/actions';

const initialState = {
  loadingPage: false,
  loadingTableData: false,
  loadingAutoComplete: false,
  stats: [],
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

export default actionsObj => (state = initialState, action = {}) => {
  switch (action.type) {
    // REQUEST
    case actionsObj.GET.REQUEST:
      return {
        ...state,
        activeFilterId: 'All',
        loadingPage: true,
        loadingTableData: false,
        filterDeleted: false,
        limit: action.limit,
        offset: action.offset
      };
    case actionsObj.GET_WITH_FILTER.REQUEST:
      return {
        ...state,
        loadingPage: false,
        loadingTableData: true,
        activeFilterId: action.payload.id,
        limit: action.payload.limit,
        offset: action.payload.offset
      };
    case actionsObj.FILTER_UPDATE.REQUEST:
    case actionsObj.FILTER_SAVE.REQUEST:
    case actionsObj.FILTER_DELETE.REQUEST:
      return {
        ...state,
        loadingPage: true
      };
    case actionsObj.UPDATE_DEFAULT_COLUMNS.REQUEST:
      return {
        ...state,
        loadingPage: false,
        loadingTableData: true,
      };
    case actionsObj.SEARCH.REQUEST:
      return {
        ...state,
        autocomplete: [],
        keyword: action.payload,
        loadingAutoComplete: action.payload.length > 2,
      };

    // SUCCESS
    case actionsObj.GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        loadingTableData: false,
        data: action.data,
      };
    case actionsObj.GET_WITH_FILTER.SUCCESS:
      return {
        ...state,
        loadingTableData: false,
        data: action.data,
      };
    case actionsObj.FILTER_UPDATE.SUCCESS:
      return {
        ...state,
        data: action.data,
        loadingPage: false,
        loadingTableData: false,
      };
    case actionsObj.FILTER_DELETE.SUCCESS:
      return {
        ...state,
        filterDeleted: true
      };
    case actionsObj.FILTER_SAVE.SUCCESS:
      return {
        ...state,
        data: action.data,
        loadingPage: false,
        loadingTableData: false,
        activeFilterId: getMaxId(action.data.filters).toString()
      };
    case actionsObj.UPDATE_DEFAULT_COLUMNS.SUCCESS: {
      return {
        ...state,
        data: action.data,
        loadingPage: false,
        loadingTableData: false,
      };
    }
    case actionsObj.SEARCH.SUCCESS:
      return {
        ...state,
        loadingAutoComplete: false,
        autocomplete: action.data,
      };
    case actionsObj.CHANGE_ACTIVE_FILTER.REQUEST:
      return {
        ...state,
        loadingAutoComplete: false,
        data: {
          ...state.data,
          tableData: [],
          totalRows: 0
        },
        activeFilterId: action.payload.id,
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false,
        loadingTableData: false,
        loadingAutoComplete: false
      };
    default:
      return state;
  }
};
