import { LocationAction, LocationActionType } from "../definitions/Actions";
import { Coordinates } from "../definitions/Map";

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
