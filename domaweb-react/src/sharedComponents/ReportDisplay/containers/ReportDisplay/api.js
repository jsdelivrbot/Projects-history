import request from './../../../../utils/api/request_super';
import patch from './../../../../utils/api/patch';
import { reqHeaders } from './../../../../utils/api/headers';

/**
 * ReportDisplay APIs
 */

const url = process.env.CONFIG.apiUrl;

export const getReports = {
  reports: customerId =>
    request(`${url}/customers/${customerId}/reports?limit=10&sort=-eventTime&expand=editingUser,customer`, reqHeaders),
  moreReports: (customerId, currentLastReportId) =>
    request(`${url}/customers/${customerId}/reports?after=${currentLastReportId}&after_type=LEGACY&limit=10&sort=-eventTime&expand=editingUser`, reqHeaders),
  reportsWithFilters: (customerId, currentLastReportId, filters) => {
    let filterString = '';
    if (filters.searchKeys) {
      filterString += filters.searchKeys ? `&search=${filters.searchKeys}` : '';
    }
    if (filters.startDate || filters.endDate) {
      filterString += '&q=';
      filterString += filters.startDate ? `eventTime>${filters.startDate.toISOString()},` : '';
      filterString += filters.endDate ? `eventTime<${filters.endDate.toISOString()}` : '';
    }
    return request(`${url}/customers/${customerId}/reports?after=${currentLastReportId}&after_type=LEGACY&limit=10&sort=-eventTime&expand=editingUser${filterString}`, reqHeaders);
  },
};

export default getReports;
