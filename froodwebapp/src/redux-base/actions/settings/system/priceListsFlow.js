import {
  createRequestTypes,
  createRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const PRICE_LISTS_GET = createRequestTypes('PRICE_LISTS_GET');

// ------------------------Action creators----------------
export const priceListsGetRequest = createRequestFunc(PRICE_LISTS_GET, 'pricelists');

// -------------------Add actions to Sagas ---------------
addActionsToSagas([
  PRICE_LISTS_GET
]);
