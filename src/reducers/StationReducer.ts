import { StationAction, StationActionType } from '../actions/StationAction';
import { StationRequest, StationViewModel } from '../types/Station';

export interface StationState {
  list: StationViewModel[];
  isLoading: boolean;
  lastRequest?: StationRequest;
}

const defaultState: StationState = {
  list: [],
  isLoading: false,
};

const stationReducer = (
  state: StationState = defaultState,
  action: StationAction,
): StationState => {
  if (action.type === StationActionType.Save) {
    return {
      ...state,
      list: action.payload.data,
      lastRequest: action.payload.params,
    };
  } else {
    return state;
  }
};

export default stationReducer;
