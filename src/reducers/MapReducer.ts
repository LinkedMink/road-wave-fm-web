import { MapAction, MapActionType } from '../actions/MapAction';
import { MapsApi } from '../types/Map';

export interface MapState {
  api?: MapsApi;
}

const defaultState: MapState = {};

const MapReducer = (state: MapState = defaultState, action: MapAction): MapState => {
  if (action.type === MapActionType.Init) {
    return {
      api: action.payload,
    };
  } else {
    return state;
  }
};

export default MapReducer;
