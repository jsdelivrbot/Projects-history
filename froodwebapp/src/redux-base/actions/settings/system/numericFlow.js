import {
  createRequestTypes,
  createRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const NUMERIC_SAVE = createRequestTypes('NUMERIC_SAVE');

// ------------------------Action creators---------------
export const numericSaveRequest = createRequestFunc(NUMERIC_SAVE, 'numberFormats');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  NUMERIC_SAVE
]);
