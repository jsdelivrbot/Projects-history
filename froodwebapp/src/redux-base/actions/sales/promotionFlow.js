import {
  createRequestTypes,
  createRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const PROMOTION_GET = createRequestTypes('PROMOTION_GET');
export const PROMOTION_SAVE = createRequestTypes('PROMOTION_SAVE');
export const PROMOTION_UPDATE = createRequestTypes('PROMOTION_UPDATE');

// ------------------------Action creators---------------
export const promotionGetRequest = createRequestFunc(PROMOTION_GET, 'promotion/{id}');
export const promotionSaveRequest = createRequestFunc(PROMOTION_SAVE, 'promotion');
export const promotionUpdateRequest = createRequestFunc(PROMOTION_UPDATE, 'promotion');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  PROMOTION_GET,
  PROMOTION_SAVE,
  PROMOTION_UPDATE
]);
