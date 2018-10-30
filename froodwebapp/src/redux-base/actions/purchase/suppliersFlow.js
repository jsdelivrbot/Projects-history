import {
  getMainContainerActions,
  getMainContainerActionsCreators
} from 'utils';
import { addMainContainerActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const SUPPLIERS = getMainContainerActions('SUPPLIERS');

// ------------------------Action creators---------------
export const SUPPLIERS_REQUESTS = getMainContainerActionsCreators(SUPPLIERS, 'vendors');

addMainContainerActionsToSagas(SUPPLIERS);
