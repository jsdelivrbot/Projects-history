import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const TAX_CODES_GET = createRequestTypes('TAX_CODES_GET');
export const TAX_CODES_SAVE = createRequestTypes('TAX_CODES_SAVE');
export const TAX_CODES_UPDATE = createRequestTypes('TAX_CODES_UPDATE');
export const TAX_CODES_DELETE = createRequestTypes('TAX_CODES_DELETE');

export const TAX_CATEGORIES_GET_PARALLEL = createRequestTypes('TAX_CATEGORIES_GET_PARALLEL');
export const TAX_CATEGORIES_SAVE = createRequestTypes('TAX_CATEGORIES_SAVE');
export const TAX_CATEGORIES_UPDATE = createRequestTypes('TAX_CATEGORIES_UPDATE');
export const TAX_CATEGORIES_DELETE = createRequestTypes('TAX_CATEGORIES_DELETE');

// ------------------------Action creators---------------
export const taxCodesGetRequest = createRequestFunc(TAX_CODES_GET, 'tax/rates');
export const taxCodesSaveRequest = createRequestFunc(TAX_CODES_SAVE, 'tax/rates');
export const taxCodesUpdateRequest = createRequestFunc(TAX_CODES_UPDATE, 'tax/rates');
export const taxCodesDeleteRequest = createRequestFunc(TAX_CODES_DELETE, 'tax/rates/{id}');

export const taxCategoriesGetRequest = createParallelRequestFunc(TAX_CATEGORIES_GET_PARALLEL, ['tax/categories', 'tax/rates']);
export const taxCategoriesSaveRequest = createRequestFunc(TAX_CATEGORIES_SAVE, 'tax/categories');
export const taxCategoriesUpdateRequest = createRequestFunc(TAX_CATEGORIES_UPDATE, 'tax/categories');
export const taxCategoriesDeleteRequest = createRequestFunc(TAX_CATEGORIES_DELETE, 'tax/categories/{id}');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  TAX_CODES_GET,
  TAX_CODES_SAVE,
  TAX_CODES_UPDATE,
  TAX_CODES_DELETE,

  TAX_CATEGORIES_GET_PARALLEL,
  TAX_CATEGORIES_SAVE,
  TAX_CATEGORIES_UPDATE,
  TAX_CATEGORIES_DELETE
]);
