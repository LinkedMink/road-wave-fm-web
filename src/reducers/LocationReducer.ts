import { Reducer } from 'redux';
import { LocationAction, LocationActionType } from '../definitions/Actions';
import { Coordinates } from '../definitions/Map';
import { LocationState } from '../definitions/State';

const defaultState: LocationState = {
  hasFailedGetLocation: false,
};

const locationReducer: Reducer<LocationState, LocationAction> = (
  state: LocationState = defaultState,
  action: LocationAction,
): LocationState => {
  if (action.type === LocationActionType.LocationUserSet) {
    return {
      ...state,
      user: action.payload as Coordinates,
    };
  } else if (action.type === LocationActionType.LocationSearchSet) {
    return {
      ...state,
      search: action.payload as Coordinates,
    };
  } else if (action.type === LocationActionType.LocationSearchClear) {
    return {
      ...state,
      search: undefined,
    };
  } else if (action.type === LocationActionType.LocationWatchIdSet) {
    return {
      ...state,
      watchId: action.payload as number,
      hasFailedGetLocation: false,
    };
  } else if (action.type === LocationActionType.LocationWatchIdClear) {
    return {
      ...state,
      watchId: undefined,
      user: undefined,
    };
  } else if (action.type === LocationActionType.LocationWatchFailed) {
    return {
      ...state,
      watchId: undefined,
      user: undefined,
      hasFailedGetLocation: true,
    };
  } else {
    return state;
  }
};

export default locationReducer;
