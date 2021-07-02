import { Action } from 'redux';
import { Coordinates } from '../types/Location';

export enum LocationActionType {
  LocationSet = 'LOCATION_SET',
  LocationClear = 'LOCATION_CLEAR',
  LocationWatchIdSet = 'LOCATION_WATCH_ID_SET',
  LocationWatchIdClear = 'LOCATION_WATCH_ID_CLEAR',
}

export interface LocationAction extends Action<LocationActionType> {
  type: LocationActionType;
  payload: null | number | Coordinates;
}

export function setLocation(coordinates: Coordinates): LocationAction {
  return {
    type: LocationActionType.LocationSet,
    payload: coordinates,
  };
}

export function clearLocation(): LocationAction {
  return {
    type: LocationActionType.LocationClear,
    payload: null,
  };
}

export function setLocationWatchId(id: number): LocationAction {
  return {
    type: LocationActionType.LocationSet,
    payload: id,
  };
}

export function clearLocationWatchId(): LocationAction {
  return {
    type: LocationActionType.LocationClear,
    payload: null,
  };
}
