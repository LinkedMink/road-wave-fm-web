import { MapAction, MapActionType } from '../actions/MapAction';
import Maps from '../shared/Maps';

export interface MapState {
  reference?: Maps;
}

const defaultState: MapState = {};

const MapReducer = (state: MapState = defaultState, action: MapAction): MapState => {
  if (action.type === MapActionType.Init) {
    return {
      reference: action.payload,
    };
  } else {
    return state;
  }
};

export default MapReducer;
