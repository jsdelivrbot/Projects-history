import {
  getMainContainerActions,
  getMainContainerActionsCreators
} from 'utils';
import { addMainContainerActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const CUSTOMERS = getMainContainerActions('CUSTOMERS');

// ------------------------Action creators---------------
export const CUSTOMERS_REQUESTS = getMainContainerActionsCreators(CUSTOMERS, 'customers');

addMainContainerActionsToSagas(CUSTOMERS);
