import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const TRANSPORTERS_GET = createRequestTypes('TRANSPORTERS_GET');
export const TRANSPORTERS_UPDATE = createRequestTypes('TRANSPORTERS_UPDATE');

export const FULFILMENT_ITEM_GET_PARALLEL = createRequestTypes('FULFILMENT_ITEM_GET_PARALLEL');

export const SLOTS_GET = createRequestTypes('SLOTS_GET');
export const SLOTS_SAVE = createRequestTypes('SLOTS_SAVE');
export const SLOTS_UPDATE = createRequestTypes('SLOTS_UPDATE');
export const SLOTS_STATUS_UPDATE = createRequestTypes('SLOTS_STATUS_UPDATE');
export const SLOTS_DELETE = createRequestTypes('SLOTS_DELETE');

export const HOLIDAYS_GET = createRequestTypes('HOLIDAYS_GET');
export const HOLIDAYS_SAVE = createRequestTypes('HOLIDAYS_SAVE');
export const HOLIDAYS_DELETE = createRequestTypes('HOLIDAYS_DELETE');

export const EXTRAS_GET = createRequestTypes('EXTRAS_GET');
export const EXTRAS_UPDATE = createRequestTypes('EXTRAS_UPDATE');

// ------------------------Action creators---------------
export const transportersGetRequest = createRequestFunc(TRANSPORTERS_GET, 'transporters');
export const transportersUpdateRequest = createRequestFunc(TRANSPORTERS_UPDATE, 'transporters');

export const fulfilmentItemGetRequest = createParallelRequestFunc(FULFILMENT_ITEM_GET_PARALLEL, ['transporters/{id}/slots', 'transporters/{id}/extras']);

export const slotsGetRequest = createRequestFunc(SLOTS_GET, 'transporters/{id}/slots');
export const slotsUpdateRequest = createRequestFunc(SLOTS_UPDATE, 'transporters/{id}/slots');
export const slotStatusUpdateRequest = createRequestFunc(SLOTS_STATUS_UPDATE, 'transporters/{id}/days');
export const slotItemSaveRequest = createRequestFunc(SLOTS_SAVE, 'transporters/{id}/slots');
export const slotItemDeleteRequest = createRequestFunc(SLOTS_DELETE, 'transporters/{id}/slots/{slotId}');

export const holidaysGetRequest = createRequestFunc(HOLIDAYS_GET, 'transporters/{id}/holidays');
export const holidaySaveRequest = createRequestFunc(HOLIDAYS_SAVE, 'transporters/{id}/holidays');
export const holidayDeleteRequest = createRequestFunc(HOLIDAYS_DELETE, 'transporters/{id}/holidays/{holidayId}');

export const extrasUpdateRequest = createRequestFunc(EXTRAS_UPDATE, 'transporters/{id}/extras');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  TRANSPORTERS_GET,
  TRANSPORTERS_UPDATE,
  FULFILMENT_ITEM_GET_PARALLEL,
  SLOTS_GET,
  SLOTS_SAVE,
  SLOTS_UPDATE,
  SLOTS_STATUS_UPDATE,
  SLOTS_DELETE,
  HOLIDAYS_GET,
  HOLIDAYS_SAVE,
  HOLIDAYS_DELETE,
  EXTRAS_GET,
  EXTRAS_UPDATE
]);

