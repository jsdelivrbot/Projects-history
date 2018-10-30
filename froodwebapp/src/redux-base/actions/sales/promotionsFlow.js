import {
  getMainContainerActions,
  getMainContainerActionsCreators
} from 'utils';
import { addMainContainerActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const PROMOTIONS = getMainContainerActions('PROMOTIONS');

// ------------------------Action creators---------------
export const PROMOTIONS_REQUESTS = getMainContainerActionsCreators(PROMOTIONS, 'promotions');

addMainContainerActionsToSagas(PROMOTIONS);

