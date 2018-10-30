import {
  getMainContainerActions,
  getMainContainerActionsCreators
} from 'utils';
import { addMainContainerActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const ITEMS = getMainContainerActions('ITEMS');

// ------------------------Action creators---------------
export const ITEMS_REQUESTS = getMainContainerActionsCreators(ITEMS, 'inventory');

addMainContainerActionsToSagas(ITEMS);
