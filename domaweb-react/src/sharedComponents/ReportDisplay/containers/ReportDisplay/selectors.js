import { createSelector } from 'reselect';

/**
 * Direct selector to the reportDisplay state domain
 */
const selectReportsDomain = () => state => state.get('reports');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ReportDisplay
 */

const makeSelectReportDisplay = () => createSelector(
  selectReportsDomain(),
  substate => substate.toJS(),
);

const makeSelectCurrentCustomerId = () => createSelector(
  selectReportsDomain(),
  (reports) => {
    const customer = reports.get('customer');
    return customer.customerId;
  },
);

const makeSelectCurrentCustomerInfo = () => createSelector(
  selectReportsDomain(),
  (reports) => reports.get('customer'),
);

const makeSelectReports = () => createSelector(
  selectReportsDomain(),
  reports => reports.get('reports'),
);

const makeSelectFilteredReports = () => createSelector(
  selectReportsDomain(),
  (reports) => {
    const filteredReports = reports.get('filteredReports');
    return filteredReports || [];
  },
);

const makeSelectCurrentLastReportId = () => createSelector(
  selectReportsDomain(),
  reports => reports.get('currentLastReportId'),
);

const makeSelectCurrentLastFilteredReportId = () => createSelector(
  selectReportsDomain(),
  reports => reports.get('currentLastFilteredReportId'),
);

const makeSelectIsLazyLoading = () => createSelector(
  selectReportsDomain(),
  reports => reports.get('isLazyLoading'),
);

const makeSelectLoadMore = () => createSelector(
  selectReportsDomain(),
  reports => reports.get('loadMore'),
);

const makeSelectLocalFilteredReports = () => createSelector(
  selectReportsDomain(),
  (reports) => {
    const currentReports = reports.get('reports');
    const localFilteredReportIds = reports.get('localFilteredReportIds');

    if (!currentReports || !localFilteredReportIds) return [];

    const localFilteredReports = [];

    for (let i = 0; i < localFilteredReportIds.length; i++) {
      const matchedReport = currentReports.find(report => report.id === localFilteredReportIds[i]);
      localFilteredReports.push(matchedReport);
    }

    return localFilteredReports;
  },
);

const makeSelectFilterMode = () => createSelector(
  selectReportsDomain(),
  reports => reports.get('filterMode'),
);

const makeSelectLoadMoreWithFilters = () => createSelector(
  selectReportsDomain(),
  reports => reports.get('loadMoreWithFilters'),
);

export default makeSelectReportDisplay;
export {
  makeSelectCurrentCustomerId,
  makeSelectCurrentCustomerInfo,
  makeSelectReports,
  makeSelectFilteredReports,
  makeSelectCurrentLastReportId,
  makeSelectCurrentLastFilteredReportId,
  makeSelectIsLazyLoading,
  makeSelectLoadMore,
  makeSelectLocalFilteredReports,
  makeSelectFilterMode,
  makeSelectLoadMoreWithFilters,
};
