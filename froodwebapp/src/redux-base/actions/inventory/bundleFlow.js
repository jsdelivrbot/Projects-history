import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants--------------
export const BUNDLE_UOM_LOCATIONS_GET_PARALLEL = createRequestTypes('BUNDLE_UOM_LOCATIONS_GET_PARALLEL');
export const BUNDLE_INFO_GET_PARALLEL = createRequestTypes('BUNDLE_INFO_GET_PARALLEL');
export const BUNDLE_INFO_GET = createRequestTypes('BUNDLE_INFO_GET');
export const BUNDLE_INFO_SAVE = createRequestTypes('BUNDLE_INFO_SAVE');
export const BUNDLE_INFO_UPDATE = createRequestTypes('BUNDLE_INFO_UPDATE');

export const BUNDLE_ITEMS_GET = createRequestTypes('BUNDLE_ITEMS_GET');
export const BUNDLE_ITEMS_SAVE = createRequestTypes('BUNDLE_ITEMS_SAVE');
export const BUNDLE_ITEMS_UPDATE = createRequestTypes('BUNDLE_ITEMS_UPDATE');
export const BUNDLE_ITEMS_DELETE = createRequestTypes('BUNDLE_ITEMS_DELETE');

export const BUNDLE_ASSEMBLIES_GET = createRequestTypes('BUNDLE_ASSEMBLIES_GET');
export const BUNDLE_ASSEMBLIES_UPDATE = createRequestTypes('BUNDLE_ASSEMBLIES_UPDATE');

// ------------------------Action creators---------------
export const bundleUomLocationsGetParallelRequest = createParallelRequestFunc(BUNDLE_UOM_LOCATIONS_GET_PARALLEL, ['uoms', 'locations']);
export const bundleInfoGetParallelRequest = createParallelRequestFunc(BUNDLE_INFO_GET_PARALLEL, ['bundle/{id}', 'uoms', 'locations']);
export const bundleInfoGetRequest = createRequestFunc(BUNDLE_INFO_GET, 'bundle/{id}');
export const bundleInfoSaveRequest = createRequestFunc(BUNDLE_INFO_SAVE, 'bundle');
export const bundleInfoUpdateRequest = createRequestFunc(BUNDLE_INFO_UPDATE, 'bundle');

export const bundleItemsGetRequest = createRequestFunc(BUNDLE_ITEMS_GET, 'bundle/{id}/items');
export const bundleItemsSaveRequest = createRequestFunc(BUNDLE_ITEMS_SAVE, 'bundle/{id}/item');
export const bundleItemsUpdateRequest = createRequestFunc(BUNDLE_ITEMS_UPDATE, 'bundle/{id}/item');
export const bundleItemsDeleteRequest = createRequestFunc(BUNDLE_ITEMS_DELETE, 'bundle/{id}/item/{itemId}');

export const bundleAssembliesGetRequest = createRequestFunc(BUNDLE_ASSEMBLIES_GET, 'bundle/{id}/batches');
export const bundleAssembliesUpdateRequest = createRequestFunc(BUNDLE_ASSEMBLIES_UPDATE, 'bundle/{id}');

// -------------------Add actions to Sagas --------------
addActionsToSagas([
  BUNDLE_UOM_LOCATIONS_GET_PARALLEL,
  BUNDLE_INFO_GET_PARALLEL,
  BUNDLE_INFO_GET,
  BUNDLE_INFO_SAVE,
  BUNDLE_INFO_UPDATE,

  BUNDLE_ITEMS_GET,
  BUNDLE_ITEMS_SAVE,
  BUNDLE_ITEMS_UPDATE,
  BUNDLE_ITEMS_DELETE,

  BUNDLE_ASSEMBLIES_GET,
  BUNDLE_ASSEMBLIES_UPDATE,
]);
