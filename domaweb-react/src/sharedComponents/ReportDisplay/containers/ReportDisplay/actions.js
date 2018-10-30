/*
 *
 * ReportDisplay actions
 *
 */

import {
  GET_REPORTS, GET_REPORTS_SUCCESS,
  GET_MORE_REPORTS, GET_MORE_REPORTS_SUCCESS,
  SET_CURRENT_CUSTOMER_INFO, SET_CURRENT_LAST_REPORT_ID,
  SET_LAZY_LOADING_ON, SET_LAZY_LOADING_OFF,
  SET_LOAD_MORE_ON, SET_LOAD_MORE_OFF,
  GET_FILTERED_REPORTS, GET_FILTERED_REPORTS_SUCCESS,
  SET_CURRENT_LAST_FILTERED_REPORT_ID,
  RESET_FILTERED_REPORTS, SET_LOCAL_FILTERED_REPORT_IDS,
  SET_FILTER_MODE_ON, SET_FILTER_MODE_OFF, ON_FILTERS_CHANGED,
  SET_LOAD_MORE_WITH_FILTERS_ON, SET_LOAD_MORE_WITH_FILTERS_OFF,
  ON_REPORT_DISPLAY_CLOSED,
} from './constants';

export function getReports(customerId) {
  return {
    type: GET_REPORTS,
    customerId,
  };
}

export function onGetReports(reports) {
  return {
    type: GET_REPORTS_SUCCESS,
    reports,
  };
}

export function setCurrentCustomerInfo(customerId, customerName, ssn) {
  return {
    type: SET_CURRENT_CUSTOMER_INFO,
    customerId,
    customerName,
    ssn,
  };
}

export function setCurrentLastReportId(lastReportId) {
  return {
    type: SET_CURRENT_LAST_REPORT_ID,
    lastReportId,
  };
}

export function setLazyLoadingOn() {
  return {
    type: SET_LAZY_LOADING_ON,
  };
}

export function setLazyLoadingOff() {
  return {
    type: SET_LAZY_LOADING_OFF,
  };
}

export function setLoadMoreOff() {
  return {
    type: SET_LOAD_MORE_OFF,
  };
}

export function setLoadMoreOn() {
  return {
    type: SET_LOAD_MORE_ON,
  };
}

export function getMoreReports() {
  return {
    type: GET_MORE_REPORTS,
  };
}

export function onGetMoreReports(moreReports) {
  return {
    type: GET_MORE_REPORTS_SUCCESS,
    moreReports,
  };
}

export function onFiltersChanged(filters) {
  return {
    type: ON_FILTERS_CHANGED,
    filters,
  };
}

export function getFilteredReports(filters) {
  return {
    type: GET_FILTERED_REPORTS,
    filters,
  };
}

export function setLocalFilteredReportIds(localFilteredReportIds) {
  return {
    type: SET_LOCAL_FILTERED_REPORT_IDS,
    localFilteredReportIds,
  };
}

export function onGetFilteredReports(filteredReports) {
  return {
    type: GET_FILTERED_REPORTS_SUCCESS,
    filteredReports,
  };
}

export function setCurrentLastFilteredReportId(currentLastFilteredReportId) {
  return {
    type: SET_CURRENT_LAST_FILTERED_REPORT_ID,
    currentLastFilteredReportId,
  };
}

export function setFilterModeOn() {
  return {
    type: SET_FILTER_MODE_ON,
  };
}

export function setFilterModeOff() {
  return {
    type: SET_FILTER_MODE_OFF,
  };
}

export function resetFilteredReport() {
  return {
    type: RESET_FILTERED_REPORTS,
  };
}

export function setLoadMoreWithFiltersOff() {
  return {
    type: SET_LOAD_MORE_WITH_FILTERS_OFF,
  };
}

export function setLoadMoreWithFiltersOn() {
  return {
    type: SET_LOAD_MORE_WITH_FILTERS_ON,
  };
}

export function onReportDisplayClosed() {
  return {
    type: ON_REPORT_DISPLAY_CLOSED,
  };
}
