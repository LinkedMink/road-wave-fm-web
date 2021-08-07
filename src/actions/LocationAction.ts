import { Action } from 'redux';
import { Coordinates } from '../types/Map';

export enum LocationActionType {
  LocationUserSet = 'LOCATION_USER_SET',
  LocationSearchSet = 'LOCATION_SEARCH_SET',
  LocationSearchClear = 'LOCATION_SEARCH_CLEAR',
  LocationWatchIdSet = 'LOCATION_WATCH_ID_SET',
  LocationWatchIdClear = 'LOCATION_WATCH_ID_CLEAR',
  LocationWatchFailed = 'LOCATION_FAILED',
}

export interface LocationAction extends Action<LocationActionType> {
  type: LocationActionType;
  payload: null | number | Coordinates;
}

export function setUserLocation(coordinates: Coordinates): LocationAction {
  return {
    type: LocationActionType.LocationUserSet,
    payload: coordinates,
  };
}

export function setSearchLocation(coordinates: Coordinates): LocationAction {
  return {
    type: LocationActionType.LocationSearchSet,
    payload: coordinates,
  };
}

export function clearSearchLocation(): LocationAction {
  return {
    type: LocationActionType.LocationSearchClear,
    payload: null,
  };
}

export function setLocationWatchId(id: number): LocationAction {
  return {
    type: LocationActionType.LocationWatchIdSet,
    payload: id,
  };
}

export function clearLocationWatchId(): LocationAction {
  return {
    type: LocationActionType.LocationWatchIdClear,
    payload: null,
  };
}

export function setLocationWatchFailed(): LocationAction {
  return {
    type: LocationActionType.LocationWatchFailed,
    payload: null,
  };
}
