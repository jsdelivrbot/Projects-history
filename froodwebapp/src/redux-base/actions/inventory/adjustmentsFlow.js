import {
  getMainContainerActions,
  getMainContainerActionsCreators
} from 'utils';
import { addMainContainerActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const ADJUSTMENTS = getMainContainerActions('ADJUSTMENTS');

// ------------------------Action creators---------------
export const ADJUSTMENTS_REQUESTS = getMainContainerActionsCreators(ADJUSTMENTS, 'adjustments');

addMainContainerActionsToSagas(ADJUSTMENTS);
