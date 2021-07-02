import { Reducer } from 'redux';
import { LocationAction, LocationActionType } from '../actions/LocationAction';
import { Coordinates } from '../types/Location';

export interface LocationState {
  hasPermission: boolean;
  location?: Coordinates;
}

const defaultState: LocationState = {
  hasPermission: false,
};

const locationReducer: Reducer<LocationState, LocationAction> = (
  state: LocationState = defaultState,
  action: LocationAction,
): LocationState => {
  if (action.type === LocationActionType.LocationSet) {
    return Object.assign({}, state, {
      location: action.payload,
    });
  } else {
    return state;
  }
};

export default locationReducer;
