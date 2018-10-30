import {
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
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  itemInfo: {},
  bins: [],
  availableBins: [],
  suppliers: [],
  uoms: [],
  stockLifeCycles: [],
  images: [],
  loadingPage: false,
  needReloadBins: false,
  needReloadUOM: false,
  needReloadSuppliers: false,
  needReloadSLC: false,
  needReloadImages: false,
};

export default function item(state = initialState, action = {}) {
  switch (action.type) {
    case ITEM_INFO_GET_PARALLEL.REQUEST:
    case ITEM_INFO_GET.REQUEST:
      return {
        ...state,
        loadingPage: true,
        itemInfo: {},
        needReloadBins: false,
        needReloadUOM: false,
        needReloadSuppliers: false,
        needReloadSLC: false,
        needReloadImages: false,
      };
    case ITEM_INFO_SAVE.REQUEST:
    case ITEM_INFO_UPDATE.REQUEST:
    case ITEM_BINS_GET.REQUEST:
    case ITEM_BINS_SAVE.REQUEST:
    case ITEM_BINS_UPDATE.REQUEST:
    case ITEM_SUPPLIERS_GET.REQUEST:
    case ITEM_SUPPLIERS_SAVE.REQUEST:
    case ITEM_SUPPLIERS_UPDATE.REQUEST:
    case ITEM_UOM_GET.REQUEST:
    case ITEM_UOM_SAVE.REQUEST:
    case ITEM_UOM_UPDATE.REQUEST:
    case ITEM_UOM_DELETE.REQUEST:
    case ITEM_SLC_GET.REQUEST:
    case ITEM_SLC_SAVE.REQUEST:
    case ITEM_SLC_UPDATE.REQUEST:
    case ITEM_SLC_MOVE_UPDATE.REQUEST:
    case ITEM_IMAGES_GET.REQUEST:
    case ITEM_IMAGES_SAVE.REQUEST:
    case ITEM_IMAGES_DELETE.REQUEST:
      return {
        ...state,
        loadingPage: true,
        needReloadBins: false,
        needReloadUOM: false,
        needReloadSuppliers: false,
        needReloadSLC: false,
        needReloadImages: false,
      };
    case ITEM_INFO_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        itemInfo: action.data[0]
      };
    case ITEM_INFO_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        itemInfo: action.data
      };
    case ITEM_INFO_SAVE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        itemInfo: action.data
      };
    case ITEM_INFO_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        itemInfo: action.data
      };
    case ITEM_BINS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        bins: action.data.bins,
        availableBins: action.data.availableBins
      };
    case ITEM_BINS_SAVE.SUCCESS:
    case ITEM_BINS_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadBins: true
      };
    case ITEM_SUPPLIERS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        suppliers: action.data
      };
    case ITEM_SUPPLIERS_SAVE.SUCCESS:
    case ITEM_SUPPLIERS_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadSuppliers: true
      };
    case ITEM_UOM_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        uoms: action.data,
      };
    case ITEM_UOM_SAVE.SUCCESS:
    case ITEM_UOM_UPDATE.SUCCESS:
    case ITEM_UOM_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadUOM: true
      };
    case ITEM_SLC_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        stockLifeCycles: action.data,
      };
    case ITEM_SLC_SAVE.SUCCESS:
    case ITEM_SLC_MOVE_UPDATE.SUCCESS:
    case ITEM_SLC_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadSLC: true
      };
    case ITEM_IMAGES_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        images: action.data
      };
    case ITEM_IMAGES_SAVE.SUCCESS:
    case ITEM_IMAGES_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadImages: true
      };
    case '@@router/LOCATION_CHANGE': {
      if (action.payload.pathname.includes('all-items/')) {
        return initialState;
      }
      return state;
    }
    case ERROR:
      return {
        ...state,
        loadingPage: false,
      };
    default:
      return state;
  }
}
