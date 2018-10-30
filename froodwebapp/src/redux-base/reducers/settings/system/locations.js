import {
  LOCATIONS_INFO_UPDATE,
  LOCATIONS_GET,
  LOCATIONS_SAVE,
  LOCATIONS_UPDATE,
  STATE_CITIES_GET,
  LOCATION_ZONES_GET,
  LOCATION_ZONES_SAVE,
  LOCATION_ZONES_UPDATE,
  LOCATION_ZONE_BINS_GET,
  LOCATION_ZONE_BINS_SAVE,
  LOCATION_ZONE_BINS_UPDATE,
  BUNDLE_INFO_GET_PARALLEL,
  BUNDLE_UOM_LOCATIONS_GET_PARALLEL,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  loadingPage: false,
  needReloadLocations: false,
  needReloadLocationZones: false,
  needReloadLocationBins: false,
  locations: [],
  locationZones: [],
  locationZoneBins: [],
  activeLocation: null,
};

export default function locations(state = initialState, action = {}) {
  switch (action.type) {
    case LOCATIONS_INFO_UPDATE.REQUEST:
    case LOCATIONS_GET.REQUEST:
    case LOCATIONS_SAVE.REQUEST:
    case LOCATIONS_UPDATE.REQUEST:
    case STATE_CITIES_GET.REQUEST:
    case LOCATION_ZONES_GET.REQUEST:
    case LOCATION_ZONES_SAVE.REQUEST:
    case LOCATION_ZONES_UPDATE.REQUEST:
    case LOCATION_ZONE_BINS_GET.REQUEST:
    case LOCATION_ZONE_BINS_SAVE.REQUEST:
    case LOCATION_ZONE_BINS_UPDATE.REQUEST:
      return {
        ...state,
        loadingPage: true,
        needReloadLocations: false,
        needReloadLocationZones: false,
        needReloadLocationBins: false,
      };
    case BUNDLE_INFO_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        locations: action.data[2]
      };
    case BUNDLE_UOM_LOCATIONS_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        locations: action.data[1]
      };
    case LOCATIONS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        locations: action.data
      };
    case LOCATIONS_SAVE.SUCCESS:
    case LOCATIONS_INFO_UPDATE.SUCCESS:
    case LOCATIONS_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadLocations: true
      };
    case STATE_CITIES_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false
      };
    case LOCATION_ZONES_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        locationZones: action.data,
        locationZoneBins: []
      };
    case LOCATION_ZONES_SAVE.SUCCESS:
    case LOCATION_ZONES_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadLocationZones: true
      };
    case LOCATION_ZONE_BINS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        locationZoneBins: action.data
      };
    case LOCATION_ZONE_BINS_SAVE.SUCCESS:
    case LOCATION_ZONE_BINS_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadLocationBins: true
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false,
      };
    default:
      return state;
  }
}
