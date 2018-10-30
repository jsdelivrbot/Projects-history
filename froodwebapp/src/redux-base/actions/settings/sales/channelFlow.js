import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const CHANNEL_GET_PARALLEL = createRequestTypes('CHANNEL_GET_PARALLEL');
export const CHANNEL_UPDATE = createRequestTypes('CHANNEL_UPDATE');

// ------------------------Action creators---------------
export const channelGetRequest = createParallelRequestFunc(CHANNEL_GET_PARALLEL, ['channels/{id}', 'pricelists']);
export const channelUpdateRequest = createRequestFunc(CHANNEL_UPDATE, 'channel');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  CHANNEL_GET_PARALLEL,
  CHANNEL_UPDATE
]);
