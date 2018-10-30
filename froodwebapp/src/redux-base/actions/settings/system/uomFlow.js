import {
  createRequestTypes,
  createRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const UOM_GET = createRequestTypes('UOM_GET');
export const UOM_SAVE = createRequestTypes('UOM_SAVE');
export const UOM_UPDATE = createRequestTypes('UOM_UPDATE');
export const UOM_DELETE = createRequestTypes('UOM_DELETE');

export const UOM_CONVERSION_GET = createRequestTypes('UOM_CONVERSION_GET');
export const UOM_CONVERSION_SAVE = createRequestTypes('UOM_CONVERSION_SAVE');
export const UOM_CONVERSION_UPDATE = createRequestTypes('UOM_CONVERSION_UPDATE');
export const UOM_CONVERSION_DELETE = createRequestTypes('UOM_CONVERSION_DELETE');

// ------------------------Action creators---------------
export const uomGetRequest = createRequestFunc(UOM_GET, 'uoms');
export const uomSaveRequest = createRequestFunc(UOM_SAVE, 'uoms');
export const uomUpdateRequest = createRequestFunc(UOM_UPDATE, 'uoms');
export const uomDeleteRequest = createRequestFunc(UOM_DELETE, 'uoms/{id}');

export const uomConversionsGetRequest = createRequestFunc(UOM_CONVERSION_GET, 'uoms/{id}/conversions');
export const uomConversionsSaveRequest = createRequestFunc(UOM_CONVERSION_SAVE, 'uoms/{id}/conversions');
export const uomConversionsUpdateRequest = createRequestFunc(UOM_CONVERSION_UPDATE, 'uoms/{id}/conversions');
export const uomConversionsDeleteRequest = createRequestFunc(UOM_CONVERSION_DELETE, 'uoms/{id}/conversions/{mappingId}');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  UOM_GET,
  UOM_SAVE,
  UOM_UPDATE,
  UOM_DELETE,

  UOM_CONVERSION_GET,
  UOM_CONVERSION_SAVE,
  UOM_CONVERSION_UPDATE,
  UOM_CONVERSION_DELETE
]);
