import {
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
  ITEM_INFO_GET,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  loadingPage: false,
  needReloadItems: false,
  needReloadAssemblies: false,
  bundleInfo: {
    defaultLocationId: 8, // Default
    statusId: 0, // Under Consideration
    allocTypeId: 1 // FIFO
  },
  bundleItems: [],
  bundleAssemblies: {
    details: []
  }
};

export default function bundle(state = initialState, action = {}) {
  switch (action.type) {
    case BUNDLE_INFO_GET_PARALLEL.REQUEST:
    case BUNDLE_INFO_GET.REQUEST:
    case BUNDLE_INFO_SAVE.REQUEST:
    case BUNDLE_INFO_UPDATE.REQUEST:
    case BUNDLE_ITEMS_GET.REQUEST:
    case BUNDLE_ITEMS_SAVE.REQUEST:
    case BUNDLE_ITEMS_UPDATE.REQUEST:
    case BUNDLE_ITEMS_DELETE.REQUEST:
    case BUNDLE_ASSEMBLIES_GET.REQUEST:
    case BUNDLE_ASSEMBLIES_UPDATE.REQUEST:
    case ITEM_INFO_GET.REQUEST:
      return {
        ...state,
        loadingPage: true,
        needReloadItems: false,
        needReloadAssemblies: false,
      };
    case BUNDLE_INFO_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        bundleInfo: action.data[0]
      };
    case BUNDLE_INFO_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        bundleInfo: action.data
      };
    case BUNDLE_INFO_SAVE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        bundleInfo: action.data
      };
    case BUNDLE_INFO_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        bundleInfo: action.data
      };
    case BUNDLE_ITEMS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        bundleItems: action.data,
      };
    case BUNDLE_ITEMS_SAVE.SUCCESS:
    case BUNDLE_ITEMS_UPDATE.SUCCESS:
    case BUNDLE_ITEMS_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadItems: true,
      };
    case BUNDLE_ASSEMBLIES_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        bundleAssemblies: action.data,
      };
    case BUNDLE_ASSEMBLIES_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadAssemblies: true
      };
    case '@@router/LOCATION_CHANGE': {
      if (action.payload.pathname.includes('item-bundles/')) {
        return state;
      }
      return initialState;
    }
    case ITEM_INFO_GET.SUCCESS:
    case ERROR:
      return {
        ...state,
        loadingPage: false
      };
    default:
      return state;
  }
}
