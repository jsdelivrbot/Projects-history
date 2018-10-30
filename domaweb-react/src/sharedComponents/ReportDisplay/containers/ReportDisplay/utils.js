import moment from 'moment';

// Get all indexes of reports that match search criteria
export function getMatchedReportIds(reports, filters) {
  // Array that is going to contain all the matched IDs
  const ids = [];

  // Test regex, if matched push the matched index to 'indexes' array.
  reports.forEach((report) => {
    // If there's no search keys, defaut isMatchedRegEx to true (so everything can pass)
    let isMatchedRegEx = true;
    // If there's searchKeys then run test agains regex created via searchKeys
    if (filters.searchKeys) {
      // If need to break up keywords then uncomment the following
      // const searchRegEx = new RegExp(`${searchKeys.split(' ').filter(key => key.length > 0).join('|')}`, 'i');
      // Create search regular expression (match the whole)
      const searchRegEx = new RegExp(filters.searchKeys, 'i');

       // Test regex against name
      isMatchedRegEx =
        searchRegEx.test(`${report.editingUser.firstName || ''} ${report.editingUser.lastName || ''}`);

      // If not match name then test regex against report text
      if (!isMatchedRegEx) {
        isMatchedRegEx = report.symbolRepresentations.some(symbolRepresentation =>
          searchRegEx.test(symbolRepresentation.text),
        );
      }
    }

    // Report event time
    const reportDate = moment(report.eventTime);

    // Default isAfterStartDate to true if there's no startDate
    // Otherwise test against a start date
    let isAfterStartDate = true;
    if (filters.startDate) {
      isAfterStartDate = reportDate.isAfter(filters.startDate);
    }

    // Default isBeforeEndDate to true if there's no endDate
    // Otherwise test against an end date
    let isBeforeEndDate = true;
    if (filters.endDate) {
      isBeforeEndDate = reportDate.isBefore(filters.endDate);
    }

    // If all criteria are matched, push the ids to the array
    if (isMatchedRegEx && isAfterStartDate && isBeforeEndDate) {
      return ids.push(report.id);
    }
  });

  // Return the array of matched IDs
  return ids;
}

export default {
  getMatchedReportIds,
};
