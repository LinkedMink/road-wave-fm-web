import { Reducer } from 'redux';
import { LocationAction, LocationActionType } from '../actions/LocationAction';
import { Coordinates } from '../types/Location';

export interface LocationState {
  watchId?: number;
  current?: Coordinates;
  hasFailedGetLocation: boolean;
}

const defaultState: LocationState = {
  hasFailedGetLocation: false,
};

const locationReducer: Reducer<LocationState, LocationAction> = (
  state: LocationState = defaultState,
  action: LocationAction,
): LocationState => {
  if (action.type === LocationActionType.LocationSet) {
    return {
      ...state,
      current: action.payload as Coordinates,
      hasFailedGetLocation: false,
    };
  } else if (action.type === LocationActionType.LocationClear) {
    return {
      ...state,
      current: undefined,
    };
  } else if (action.type === LocationActionType.LocationWatchIdSet) {
    return {
      ...state,
      watchId: action.payload as number,
    };
  } else if (action.type === LocationActionType.LocationWatchIdClear) {
    return {
      ...state,
      watchId: undefined,
      current: undefined,
    };
  } else if (action.type === LocationActionType.LocationFailed) {
    return {
      ...state,
      watchId: undefined,
      current: undefined,
      hasFailedGetLocation: true,
    };
  } else {
    return state;
  }
};

export default locationReducer;
