import locations from 'redux-base/reducers/settings/system/locations';
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
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('locations reducer', () => {
  const initialState = {
    loadingPage: false,
    needReloadLocations: false,
    needReloadLocationZones: false,
    needReloadLocationBins: false,
    locationBinsSaveSuccess: false,
    locations: [],
    locationZones: [],
    locationZoneBins: [],
    activeLocation: null,
  };

  it('handles LOCATIONS_INFO_UPDATE_REQUEST action type', () => {
    const action = {
      type: LOCATIONS_INFO_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadLocations = false;
    state.needReloadLocationZones = false;
    state.needReloadLocationBins = false;
    state.locationBinsSaveSuccess = false;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATIONS_GET_REQUEST action type', () => {
    const action = {
      type: LOCATIONS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadLocations = false;
    state.needReloadLocationZones = false;
    state.needReloadLocationBins = false;
    state.locationBinsSaveSuccess = false;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATIONS_SAVE_REQUEST action type', () => {
    const action = {
      type: LOCATIONS_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadLocations = false;
    state.needReloadLocationZones = false;
    state.needReloadLocationBins = false;
    state.locationBinsSaveSuccess = false;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATIONS_UPDATE_REQUEST action type', () => {
    const action = {
      type: LOCATIONS_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadLocations = false;
    state.needReloadLocationZones = false;
    state.needReloadLocationBins = false;
    state.locationBinsSaveSuccess = false;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles STATE_CITIES_GET_REQUEST action type', () => {
    const action = {
      type: STATE_CITIES_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadLocations = false;
    state.needReloadLocationZones = false;
    state.needReloadLocationBins = false;
    state.locationBinsSaveSuccess = false;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONES_GET_REQUEST action type', () => {
    const action = {
      type: LOCATION_ZONES_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadLocations = false;
    state.needReloadLocationZones = false;
    state.needReloadLocationBins = false;
    state.locationBinsSaveSuccess = false;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONES_SAVE_REQUEST action type', () => {
    const action = {
      type: LOCATION_ZONES_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadLocations = false;
    state.needReloadLocationZones = false;
    state.needReloadLocationBins = false;
    state.locationBinsSaveSuccess = false;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONES_UPDATE_REQUEST action type', () => {
    const action = {
      type: LOCATION_ZONES_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadLocations = false;
    state.needReloadLocationZones = false;
    state.needReloadLocationBins = false;
    state.locationBinsSaveSuccess = false;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONE_BINS_GET_REQUEST action type', () => {
    const action = {
      type: LOCATION_ZONE_BINS_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadLocations = false;
    state.needReloadLocationZones = false;
    state.needReloadLocationBins = false;
    state.locationBinsSaveSuccess = false;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONE_BINS_SAVE_REQUEST action type', () => {
    const action = {
      type: LOCATION_ZONE_BINS_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadLocations = false;
    state.needReloadLocationZones = false;
    state.needReloadLocationBins = false;
    state.locationBinsSaveSuccess = false;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONE_BINS_UPDATE_REQUEST action type', () => {
    const action = {
      type: LOCATION_ZONE_BINS_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadLocations = false;
    state.needReloadLocationZones = false;
    state.needReloadLocationBins = false;
    state.locationBinsSaveSuccess = false;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_INFO_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_INFO_GET_PARALLEL.SUCCESS,
      data: ['some', 'data', 'locations']
    };

    const state = cloneDeep(initialState);
    state.locations = action.data[2];

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles BUNDLE_UOM_LOCATIONS_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: BUNDLE_UOM_LOCATIONS_GET_PARALLEL.SUCCESS,
      data: ['some', 'locations']
    };

    const state = cloneDeep(initialState);
    state.locations = action.data[1];

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATIONS_GET_SUCCESS action type', () => {
    const action = {
      type: LOCATIONS_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.locations = action.data;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATIONS_SAVE_SUCCESS action type', () => {
    const action = {
      type: LOCATIONS_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadLocations = true;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATIONS_INFO_UPDATE_SUCCESS action type', () => {
    const action = {
      type: LOCATIONS_INFO_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadLocations = true;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATIONS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: LOCATIONS_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadLocations = true;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles STATE_CITIES_GET_SUCCESS: action type', () => {
    const action = {
      type: STATE_CITIES_GET.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadLocations = false;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONES_GET_SUCCESS: action type', () => {
    const action = {
      type: LOCATION_ZONES_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.locationZones = action.data;
    state.locationZoneBins = [];

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONES_SAVE_SUCCESS: action type', () => {
    const action = {
      type: LOCATION_ZONES_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadLocationZones = true;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONES_UPDATE_SUCCESS action type', () => {
    const action = {
      type: LOCATION_ZONES_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadLocationZones = true;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONE_BINS_GET_SUCCESS action type', () => {
    const action = {
      type: LOCATION_ZONE_BINS_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.locationZoneBins = action.data;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles LOCATION_ZONE_BINS_SAVE_SUCCESS action type', () => {
    const action = {
      type: LOCATION_ZONE_BINS_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadLocationBins = true;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(locations(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(locations(initialState, {})).toEqual(initialState);
  });
});
