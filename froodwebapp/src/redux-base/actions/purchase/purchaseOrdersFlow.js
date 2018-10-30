import {
  getMainContainerActions,
  getMainContainerActionsCreators
} from 'utils';
import { addMainContainerActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const PURCHASE_ORDERS = getMainContainerActions('PURCHASE_ORDERS');

// ------------------------Action creators---------------
export const PURCHASE_ORDERS_REQUESTS = getMainContainerActionsCreators(PURCHASE_ORDERS, 'purchases');

addMainContainerActionsToSagas(PURCHASE_ORDERS);
