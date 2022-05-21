import { MapAction, MapActionType } from '../definitions/Actions';
import { MapState } from '../definitions/State';

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
