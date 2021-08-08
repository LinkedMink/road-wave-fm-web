import { MapAction, MapActionType } from '../actions/MapAction';

export interface MapState {
  isInitialized: boolean;
}

const defaultState: MapState = {
  isInitialized: false,
};

const MapReducer = (state: MapState = defaultState, action: MapAction): MapState => {
  if (action.type === MapActionType.Init) {
    return {
      isInitialized: true,
    };
  } else {
    return state;
  }
};

export default MapReducer;
