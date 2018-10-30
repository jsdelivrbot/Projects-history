import {
  createRequestTypes,
  createRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const LOCATIONS_INFO_UPDATE = createRequestTypes('LOCATIONS_INFO_UPDATE');
export const LOCATIONS_GET = createRequestTypes('LOCATIONS_GET');
export const LOCATIONS_SAVE = createRequestTypes('LOCATIONS_SAVE');
export const LOCATIONS_UPDATE = createRequestTypes('LOCATIONS_UPDATE');

export const LOCATION_ZONES_GET = createRequestTypes('LOCATION_ZONES_GET');
export const LOCATION_ZONES_SAVE = createRequestTypes('LOCATION_ZONES_SAVE');
export const LOCATION_ZONES_UPDATE = createRequestTypes('LOCATION_ZONES_UPDATE');

export const LOCATION_ZONE_BINS_GET = createRequestTypes('LOCATION_ZONE_BINS_GET');
export const LOCATION_ZONE_BINS_SAVE = createRequestTypes('LOCATION_ZONE_BINS_SAVE');
export const LOCATION_ZONE_BINS_UPDATE = createRequestTypes('LOCATION_ZONE_BINS_UPDATE');

// ------------------------Action creators---------------
export const locationsUpdateInfoRequest = createRequestFunc(LOCATIONS_INFO_UPDATE, 'locations/{id}');
export const locationsGetRequest = createRequestFunc(LOCATIONS_GET, 'locations');
export const locationsSaveRequest = createRequestFunc(LOCATIONS_SAVE, 'locations');
export const locationsUpdateRequest = createRequestFunc(LOCATIONS_UPDATE, 'locations');

export const locationZonesGetRequest = createRequestFunc(LOCATION_ZONES_GET, 'locations/{id}/zones');
export const locationZonesSaveRequest = createRequestFunc(LOCATION_ZONES_SAVE, 'locations/{id}/zones');
export const locationZonesUpdateRequest = createRequestFunc(LOCATION_ZONES_UPDATE, 'locations/{id}/zones');

export const locationZoneBinsGetRequest = createRequestFunc(LOCATION_ZONE_BINS_GET, 'locations/{id}/zones/{zoneId}/bins');
export const locationZoneBinsSaveRequest = createRequestFunc(LOCATION_ZONE_BINS_SAVE, 'locations/{id}/bins');
export const locationZoneBinsUpdateRequest = createRequestFunc(LOCATION_ZONE_BINS_UPDATE, 'locations/{id}/bins');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  LOCATIONS_INFO_UPDATE,
  LOCATIONS_GET,
  LOCATIONS_SAVE,
  LOCATIONS_UPDATE,
  LOCATION_ZONES_GET,
  LOCATION_ZONES_SAVE,
  LOCATION_ZONES_UPDATE,
  LOCATION_ZONE_BINS_GET,
  LOCATION_ZONE_BINS_SAVE,
  LOCATION_ZONE_BINS_UPDATE
]);

