import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

export const PAY_TERMS_GET_PARALLEL = createRequestTypes('PAY_TERMS_GET_PARALLEL');
export const PAY_TERMS_SAVE = createRequestTypes('PAY_TERMS_SAVE');
export const PAY_TERMS_UPDATE = createRequestTypes('PAY_TERMS_UPDATE');
export const PAY_TERMS_DELETE = createRequestTypes('PAY_TERMS_DELETE');

export const payTermsGetRequest = createParallelRequestFunc(PAY_TERMS_GET_PARALLEL, ['payterms', 'payterms/fields']);
export const payTermsSaveRequest = createRequestFunc(PAY_TERMS_SAVE, 'payterms');
export const payTermsUpdateRequest = createRequestFunc(PAY_TERMS_UPDATE, 'payterms');
export const payTermsDeleteRequest = createRequestFunc(PAY_TERMS_DELETE, 'payterms/{id}');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  PAY_TERMS_GET_PARALLEL,
  PAY_TERMS_SAVE,
  PAY_TERMS_UPDATE,
  PAY_TERMS_DELETE
]);
