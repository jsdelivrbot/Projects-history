/*
 * ReportDisplay Messages
 *
 * This contains all the text for the ReportDisplay component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.containers.ReportDisplay.title',
    defaultMessage: 'Reports',
  },
  startDate: {
    id: 'app.containers.ReportDisplay.startDate',
    defaultMessage: 'Start date',
  },
  endDate: {
    id: 'app.containers.ReportDisplay.endDate',
    defaultMessage: 'End date',
  },
  textOnly: {
    id: 'app.containers.ReportDisplay.textOnly',
    defaultMessage: 'Text only',
  },
  noReport: {
    id: 'app.containers.ReportDisplay.noReport',
    defaultMessage: 'No report available.',
  },
  noReportWithFilters: {
    id: 'app.containers.ReportDisplay.noReportWithFilters',
    defaultMessage: 'No report found within search criteria.',
  },
});
