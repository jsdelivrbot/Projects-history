/*
 *
 * ReportDisplay reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_REPORTS, GET_REPORTS_SUCCESS, GET_REPORTS_FAILED,
  GET_MORE_REPORTS, GET_MORE_REPORTS_SUCCESS, GET_MORE_REPORTS_FAILED,
  SET_CURRENT_CUSTOMER_INFO, SET_CURRENT_LAST_REPORT_ID,
  SET_LAZY_LOADING_ON, SET_LAZY_LOADING_OFF,
  SET_LOAD_MORE_ON, SET_LOAD_MORE_OFF,
  GET_FILTERED_REPORTS, GET_FILTERED_REPORTS_SUCCESS, GET_FILTERED_REPORTS_FAILED,
  SET_CURRENT_LAST_FILTERED_REPORT_ID, RESET_FILTERED_REPORTS, SET_LOCAL_FILTERED_REPORT_IDS,
  SET_FILTER_MODE_ON, SET_FILTER_MODE_OFF, ON_FILTERS_CHANGED,
  SET_LOAD_MORE_WITH_FILTERS_ON, SET_LOAD_MORE_WITH_FILTERS_OFF,
  ON_REPORT_DISPLAY_CLOSED,
} from './constants';

const initialState = fromJS({
  isLazyLoading: false,
  loadMore: true,
  reports: [],
  filterMode: false,
  filteredReports: [],
  loadMoreWithFilters: false,
});

function reportDisplayReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_CUSTOMER_INFO:
      return state
        .set('customer', {
          customerId: action.customerId,
          customerName: action.customerName,
          ssn: action.ssn,
        });

    case GET_REPORTS:
      return state
        .set('reports');

    case GET_REPORTS_SUCCESS:
      return state
        .set('reports', action.reports);

    case GET_REPORTS_FAILED:
      return state
        .set('getReportsError', fromJS(action.error));

    case SET_CURRENT_LAST_REPORT_ID:
      return state
        .set('currentLastReportId', action.lastReportId);

    case SET_LAZY_LOADING_ON:
      return state
        .set('isLazyLoading', true);

    case SET_LAZY_LOADING_OFF:
      return state
        .set('isLazyLoading', false);

    case SET_LOAD_MORE_ON:
      return state
        .set('loadMore', true);

    case SET_LOAD_MORE_OFF:
      return state
        .set('loadMore', false);

    case GET_MORE_REPORTS:
      return state;

    case GET_MORE_REPORTS_SUCCESS:
      return state
        .set('reports',
          [...state.get('reports'), ...action.moreReports],
        );

    case GET_MORE_REPORTS_FAILED:
      return state
        .set('getMoreReportsError', fromJS(action.error));

    case ON_FILTERS_CHANGED:
      return state;

    case GET_FILTERED_REPORTS:
      return state;

    case GET_FILTERED_REPORTS_SUCCESS:
      return state
        .set('filteredReports',
          [...state.get('filteredReports'), ...action.filteredReports],
        );

    case GET_FILTERED_REPORTS_FAILED:
      return state
        .set('getFilteredReportsError', fromJS(action.error));

    case SET_CURRENT_LAST_FILTERED_REPORT_ID:
      return state
        .set('currentLastFilteredReportId', action.currentLastFilteredReportId);

    case SET_LOCAL_FILTERED_REPORT_IDS:
      return state
        .set('localFilteredReportIds', action.localFilteredReportIds);

    case SET_FILTER_MODE_ON:
      return state
        .set('filterMode', true);

    case SET_FILTER_MODE_OFF:
      return state
        .set('filterMode', false);

    case SET_LOAD_MORE_WITH_FILTERS_ON:
      return state
        .set('loadMoreWithFilters', true);

    case SET_LOAD_MORE_WITH_FILTERS_OFF:
      return state
        .set('loadMoreWithFilters', false);

    case RESET_FILTERED_REPORTS:
      return state
        .set('filteredReports', [])
        .set('currentLastFilteredReportId')
        .set('localFilteredReportIds')
        .set('loadMoreWithFilters', false);

    case ON_REPORT_DISPLAY_CLOSED:
      return initialState;

    default:
      return state;
  }
}

export default reportDisplayReducer;
