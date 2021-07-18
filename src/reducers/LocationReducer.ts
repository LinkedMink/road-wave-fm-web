import { Reducer } from 'redux';
import { LocationAction, LocationActionType } from '../actions/LocationAction';
import { Coordinates } from '../types/Location';

export interface LocationState {
  watchId?: number;
  current?: Coordinates;
}

const defaultState: LocationState = {};

const locationReducer: Reducer<LocationState, LocationAction> = (
  state: LocationState = defaultState,
  action: LocationAction,
): LocationState => {
  if (action.type === LocationActionType.LocationSet) {
    return Object.assign({}, state, {
      current: action.payload,
    });
  } else if (action.type === LocationActionType.LocationClear) {
    return Object.assign({}, state, {
      current: undefined,
    });
  } else if (action.type === LocationActionType.LocationWatchIdSet) {
    return Object.assign({}, state, {
      watchId: action.payload,
    });
  } else if (action.type === LocationActionType.LocationWatchIdClear) {
    return Object.assign({}, state, {
      watchId: undefined,
    });
  } else {
    return state;
  }
};

export default locationReducer;
