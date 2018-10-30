/*
 *
 * MedicationList actions
 *
 */

import {
  INIT_MEDICATION_LIST,
  FETCH_MEDICATION_LIST_SUCCESS,
} from './constants';

export function initMedicationList(customerId) {
  return {
    type: INIT_MEDICATION_LIST,
    id: customerId,
  };
}

