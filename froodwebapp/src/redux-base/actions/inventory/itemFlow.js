import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const ITEM_INFO_GET_PARALLEL = createRequestTypes('ITEM_INFO_GET_PARALLEL');
export const ITEM_INFO_GET = createRequestTypes('ITEM_INFO_GET');
export const ITEM_INFO_SAVE = createRequestTypes('ITEM_INFO_SAVE');
export const ITEM_INFO_UPDATE = createRequestTypes('ITEM_INFO_UPDATE');

export const ITEM_BINS_GET = createRequestTypes('ITEM_BINS_GET');
export const ITEM_BINS_SAVE = createRequestTypes('ITEM_BINS_SAVE');
export const ITEM_BINS_UPDATE = createRequestTypes('ITEM_BINS_UPDATE');

export const ITEM_SUPPLIERS_GET = createRequestTypes('ITEM_SUPPLIERS_GET');
export const ITEM_SUPPLIERS_SAVE = createRequestTypes('ITEM_SUPPLIERS_SAVE');
export const ITEM_SUPPLIERS_UPDATE = createRequestTypes('ITEM_SUPPLIERS_UPDATE');

export const ITEM_UOM_GET = createRequestTypes('ITEM_UOM_GET');
export const ITEM_UOM_SAVE = createRequestTypes('ITEM_UOM_SAVE');
export const ITEM_UOM_UPDATE = createRequestTypes('ITEM_UOM_UPDATE');
export const ITEM_UOM_DELETE = createRequestTypes('ITEM_UOM_DELETE');

export const ITEM_SLC_GET = createRequestTypes('ITEM_SLC_GET');
export const ITEM_SLC_SAVE = createRequestTypes('ITEM_SLC_SAVE');
export const ITEM_SLC_UPDATE = createRequestTypes('ITEM_SLC_UPDATE');
export const ITEM_SLC_MOVE_UPDATE = createRequestTypes('ITEM_SLC_MOVE_UPDATE');

export const ITEM_IMAGES_GET = createRequestTypes('ITEM_IMAGES_GET');
export const ITEM_IMAGES_SAVE = createRequestTypes('ITEM_IMAGES_SAVE');
export const ITEM_IMAGES_DELETE = createRequestTypes('ITEM_IMAGES_DELETE');

// ------------------------Action creators---------------
export const itemInfoGetParallelRequest = createParallelRequestFunc(ITEM_INFO_GET_PARALLEL, ['sku/{id}', 'uoms']);
export const itemInfoGetRequest = createRequestFunc(ITEM_INFO_GET, 'sku/{id}');
export const itemInfoSaveRequest = createRequestFunc(ITEM_INFO_SAVE, 'sku');
export const itemInfoUpdateRequest = createRequestFunc(ITEM_INFO_UPDATE, 'sku');

export const itemBinsGetRequest = createRequestFunc(ITEM_BINS_GET, 'sku/{id}/bins');
export const itemBinsSaveRequest = createRequestFunc(ITEM_BINS_SAVE, 'sku/{id}/bins');
export const itemBinsUpdateRequest = createRequestFunc(ITEM_BINS_UPDATE, 'sku/{id}/bins');

export const itemSuppliersGetRequest = createRequestFunc(ITEM_SUPPLIERS_GET, 'sku/{id}/vendors');
export const itemSuppliersSaveRequest = createRequestFunc(ITEM_SUPPLIERS_SAVE, 'sku/{id}/vendors');
export const itemSuppliersUpdateRequest = createRequestFunc(ITEM_SUPPLIERS_UPDATE, 'sku/{id}/vendors');

export const itemUOMGetRequest = createRequestFunc(ITEM_UOM_GET, 'sku/{id}/uoms');
export const itemUOMSaveRequest = createRequestFunc(ITEM_UOM_SAVE, 'sku/{id}/uoms');
export const itemUOMUpdateRequest = createRequestFunc(ITEM_UOM_UPDATE, 'sku/{id}/uoms');
export const itemUOMDeleteRequest = createRequestFunc(ITEM_UOM_DELETE, 'sku/{id}/uom/{mappingId}');

export const itemStockLifeCycleGetRequest = createRequestFunc(ITEM_SLC_GET, 'sku/{id}/slcs');
export const itemStockLifeCycleSaveRequest = createRequestFunc(ITEM_SLC_SAVE, 'sku/{id}/slc');
export const itemStockLifeCycleUpdateRequest = createRequestFunc(ITEM_SLC_UPDATE, 'sku/{id}/slc');
export const itemStockLifeCycleMoveUpdateRequest = createRequestFunc(ITEM_SLC_MOVE_UPDATE, 'sku/{id}/slc/{slcId}/move');

export const itemImagesGetRequest = createRequestFunc(ITEM_IMAGES_GET, 'sku/{id}/images');
export const itemImageSaveRequest = createRequestFunc(ITEM_IMAGES_SAVE, 'sku/{id}/image');
export const itemImagesDeleteRequest = createRequestFunc(ITEM_IMAGES_DELETE, 'sku/{id}/image/{imageId}');

// -------------------Add actions to Sagas --------------
addActionsToSagas([
  ITEM_INFO_GET_PARALLEL,
  ITEM_INFO_GET,
  ITEM_INFO_SAVE,
  ITEM_INFO_UPDATE,

  ITEM_BINS_GET,
  ITEM_BINS_SAVE,
  ITEM_BINS_UPDATE,

  ITEM_SUPPLIERS_GET,
  ITEM_SUPPLIERS_SAVE,
  ITEM_SUPPLIERS_UPDATE,

  ITEM_UOM_GET,
  ITEM_UOM_SAVE,
  ITEM_UOM_UPDATE,
  ITEM_UOM_DELETE,

  ITEM_SLC_GET,
  ITEM_SLC_SAVE,
  ITEM_SLC_UPDATE,
  ITEM_SLC_MOVE_UPDATE,

  ITEM_IMAGES_GET,
  ITEM_IMAGES_SAVE,
  ITEM_IMAGES_DELETE,
]);
