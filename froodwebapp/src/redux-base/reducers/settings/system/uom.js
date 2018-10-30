import {
  UOM_GET,
  UOM_SAVE,
  UOM_UPDATE,
  UOM_DELETE,
  UOM_CONVERSION_GET,
  UOM_CONVERSION_SAVE,
  UOM_CONVERSION_UPDATE,
  UOM_CONVERSION_DELETE,
  ITEM_INFO_GET_PARALLEL,
  BUNDLE_INFO_GET_PARALLEL,
  BUNDLE_UOM_LOCATIONS_GET_PARALLEL
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  data: [],
  conversions: [],
  loadingPage: false,
  needReloadUOM: false,
  needReloadUOMConversions: false,
};

export default function uom(state = initialState, action = {}) {
  switch (action.type) {
    case UOM_GET.REQUEST:
    case UOM_SAVE.REQUEST:
    case UOM_UPDATE.REQUEST:
    case UOM_DELETE.REQUEST:
    case UOM_CONVERSION_GET.REQUEST:
    case UOM_CONVERSION_SAVE.REQUEST:
    case UOM_CONVERSION_UPDATE.REQUEST:
    case UOM_CONVERSION_DELETE.REQUEST:
      return {
        ...state,
        loadingPage: true,
      };
    case UOM_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        data: action.data,
        needReloadUOM: false
      };
    case ITEM_INFO_GET_PARALLEL.SUCCESS:
    case BUNDLE_INFO_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        data: action.data[1]
      };
    case BUNDLE_UOM_LOCATIONS_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        data: action.data[0]
      };
    case UOM_SAVE.SUCCESS:
    case UOM_UPDATE.SUCCESS:
    case UOM_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadUOM: true,
      };
    case UOM_CONVERSION_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        conversions: action.data,
        needReloadUOMConversions: false,
      };
    case UOM_CONVERSION_SAVE.SUCCESS:
    case UOM_CONVERSION_UPDATE.SUCCESS:
    case UOM_CONVERSION_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadUOMConversions: true,
      };
    default:
      return state;
  }
}
