import { createSelector } from 'reselect';

/**
 * Direct selector to the administeredMedication state domain
 */
const selectModalState = () => (state) =>
  state.getIn(['medicationList', 'view', 'modal']);

export default selectModalState;
