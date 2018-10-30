import { createSelector } from 'reselect';

/**
 * Direct selector to the administeredMedication state domain
 */
const selectAddNewModalState = () => (state) =>
  state.getIn(['medicationList', 'view', 'addNewModal']);

export default selectAddNewModalState;
