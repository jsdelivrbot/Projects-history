import {
  getMainContainerActions,
  getMainContainerActionsCreators
} from 'utils';
import { addMainContainerActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const BUNDLES = getMainContainerActions('BUNDLES');

// ------------------------Action creators---------------
export const BUNDLES_REQUESTS = getMainContainerActionsCreators(BUNDLES, 'bundles');

addMainContainerActionsToSagas(BUNDLES);
