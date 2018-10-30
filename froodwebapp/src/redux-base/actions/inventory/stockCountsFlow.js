import {
  getMainContainerActions,
  getMainContainerActionsCreators
} from 'utils';
import { addMainContainerActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const STOCK_COUNTS = getMainContainerActions('STOCK_COUNTS');

// ------------------------Action creators---------------
export const STOCK_COUNTS_REQUESTS = getMainContainerActionsCreators(STOCK_COUNTS, 'scs');

addMainContainerActionsToSagas(STOCK_COUNTS);
