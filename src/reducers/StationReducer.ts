import { StationAction, StationActionType, StationRequestResult } from '../actions/StationAction';
import { StationRequest, StationViewModel } from '../types/Station';

export interface StationState {
  list?: StationViewModel[];
  selected?: StationViewModel;
  isLoading: boolean;
  lastRequest?: StationRequest;
}

const defaultState: StationState = {
  isLoading: false,
};

const stationReducer = (
  state: StationState = defaultState,
  action: StationAction,
): StationState => {
  if (action.type === StationActionType.Store) {
    const requestResult = action.payload as StationRequestResult;
    return {
      ...state,
      list: requestResult.data,
      lastRequest: requestResult.params,
      selected: undefined,
    };
  } else if (action.type === StationActionType.Select) {
    return {
      ...state,
      selected: action.payload as StationViewModel,
    };
  } else if (action.type === StationActionType.LoadStart) {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === StationActionType.LoadEnd) {
    return {
      ...state,
      isLoading: false,
    };
  } else {
    return state;
  }
};

export default stationReducer;
