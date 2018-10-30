import { takeLatest, takeEvery, select, call, put } from 'redux-saga/effects';

import {
  GET_REPORTS, GET_REPORTS_FAILED,
  GET_MORE_REPORTS, GET_MORE_REPORTS_FAILED,
  ON_FILTERS_CHANGED,
  GET_FILTERED_REPORTS,
} from './constants';

import {
  setCurrentCustomerInfo,
  onGetReports,
  onGetMoreReports,
  setCurrentLastReportId,
  setLazyLoadingOn,
  setLazyLoadingOff,
  setLoadMoreOff,
  onGetFilteredReports,
  setCurrentLastFilteredReportId,
  resetFilteredReport,
  setLocalFilteredReportIds,
  setFilterModeOn,
  setFilterModeOff,
  setLoadMoreWithFiltersOn,
  setLoadMoreWithFiltersOff,
} from './actions';

import {
  makeSelectCurrentCustomerId,
  makeSelectCurrentLastReportId,
  makeSelectReports,
  makeSelectCurrentLastFilteredReportId,
  makeSelectLoadMore,
} from './selectors';

import {
  getReports as get,
} from './api';

import {
  getMatchedReportIds,
} from './utils';

// Get initial reports (10max), init saga
export function* getReports(dispatch) {
  try {
    // Get initial reports
    const reports = yield call(get.reports, dispatch.customerId);
    // If there're reports, get the last report id in the list and put it to store
    // then put customer info into store
    if (reports && reports.length > 0) {
      yield put(setCurrentLastReportId(reports[reports.length - 1].id));
      yield put(setCurrentCustomerInfo(
        reports[0].customer.id,
        `${reports[0].customer.firstName} ${reports[0].customer.lastName}`,
        reports[0].customer.ssn,
      ));
    }

    // If there are < 10 reports or no report, put loadMore flag to false
    if (!reports || reports.length < 10) {
      yield put(setLoadMoreOff());
    }

    yield put(onGetReports(reports || []));
  } catch (error) {
    yield put({ type: GET_REPORTS_FAILED, error });
  }
}

// Get more reports (10max)
export function* getMoreReports() {
  try {
    // Put lazy loading on
    yield put(setLazyLoadingOn());

    const customerId = yield select(makeSelectCurrentCustomerId());
    const currentLastReportId = yield select(makeSelectCurrentLastReportId());

    const moreReports = yield call(get.moreReports, customerId, currentLastReportId);

    // If there are < 10 reports or no report, put loadMore flag to false
    if (!moreReports || moreReports.length < 10) {
      yield put(setLoadMoreOff());
    }

    // If there're additional reports, get the last report id in the list and put it to store
    if (moreReports && moreReports.length > 0) {
      yield put(setCurrentLastReportId(moreReports[moreReports.length - 1].id));
    }

    // Pass the reports to reducer
    yield put(onGetMoreReports(moreReports || []));

    // Turn off lazy loading mode
    yield put(setLazyLoadingOff());
  } catch (error) {
    // Turn off lazy loading mode
    yield put(setLazyLoadingOff());
    yield put({ type: GET_MORE_REPORTS_FAILED, error });
  }
}

// Reaction to changed filters
export function* onFiltersChanged(dispatch) {
  yield put(resetFilteredReport());
  const filters = dispatch.filters;
  if (filters.searchKeys || filters.startDate || filters.endDate) {
    // Put filter mode on
    yield put(setFilterModeOn());

    // Get filtered report ids from the reports already in store
    const currentReports = yield select(makeSelectReports());
    const localFilteredReportIds = getMatchedReportIds(currentReports, filters);

    // Check if all reports are loaded or not
    const loadMore = yield select(makeSelectLoadMore());

    if (loadMore && localFilteredReportIds.length < 10) {
      yield put(setLoadMoreWithFiltersOn());
    }

    // Put the filtered reports id to store
    yield put(setLocalFilteredReportIds(localFilteredReportIds));
  } else {
    yield put(setFilterModeOff());
  }
}

// Load more filtered reports
export function* getFilteredReports(dispatch) {
  try {
    const filters = dispatch.filters;

    // Put lazy loading on
    yield put(setLazyLoadingOn());

    const customerId = yield select(makeSelectCurrentCustomerId());

    // Get last filtered report id
    const currentLastFilteredReportId = yield select(makeSelectCurrentLastFilteredReportId());
    const currentLastReportId = yield select(makeSelectCurrentLastReportId());

    const filteredReports = yield call(
      get.reportsWithFilters,
      customerId,
      currentLastFilteredReportId || currentLastReportId,
      filters,
    );

    // If there are < 10 reports or no report, put loadMore flag to false
    if (!filteredReports || filteredReports.length < 10) {
      yield put(setLoadMoreWithFiltersOff());
    }

    if (filteredReports && filteredReports.length > 0) {
      yield put(setCurrentLastFilteredReportId(filteredReports[filteredReports.length - 1].id));
    }

    // Pass the reports to reducer
    yield put(onGetFilteredReports(filteredReports || []));

    // Turn off lazy loading mode
    yield put(setLazyLoadingOff());
  } catch (error) {
    // Turn off lazy loading mode
    yield put(setLazyLoadingOff());
    yield put({ type: GET_MORE_REPORTS_FAILED, error });
  }
}

// Root saga for Report Display
export function* reportDisplayRootSaga() {
  yield takeLatest(GET_REPORTS, getReports);
  yield takeEvery(GET_MORE_REPORTS, getMoreReports);
  yield takeLatest(ON_FILTERS_CHANGED, onFiltersChanged);
  yield takeEvery(GET_FILTERED_REPORTS, getFilteredReports);
}

export default [
  reportDisplayRootSaga,
];
