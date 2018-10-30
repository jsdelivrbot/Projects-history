import { createSelector } from 'reselect';

/**
 * Direct selector to the booking state domain
 */
const selectBookingDomain = () => (state) => state.get('booking');


/**
 * Default selector used by Booking
 */

const Timetabs = () => createSelector(
  selectBookingDomain(),
  (timetabs) => timetabs.get('timetabs')
);

const selectedTimetabId = () => createSelector(
  selectBookingDomain(),
  (timetab) => timetab.get('selectedTimetab')
);


const selectedBookingTypes = () => createSelector(
  selectBookingDomain(),
  (bookingTypes) => bookingTypes.get('bookingTypes')
);

const isLoading = () => createSelector(
  selectBookingDomain(),
  (isLoading) => isLoading.get('isLoading')
);

const timetabDetails = () => createSelector(
  selectBookingDomain(),
  (timetabInfo) => timetabInfo.get('timetabInfo')
);
export default selectBookingDomain;
export {
  Timetabs,
  selectedTimetabId,
  selectedBookingTypes,
  isLoading,
  timetabDetails,
};
