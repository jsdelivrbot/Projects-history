import {
  createRequestTypes,
  createRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const CHANNELS_GET = createRequestTypes('CHANNELS_GET');

// ------------------------Action creators---------------
export const channelsGetRequest = createRequestFunc(CHANNELS_GET, 'channels');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  CHANNELS_GET
]);
