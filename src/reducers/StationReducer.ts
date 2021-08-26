import { StationAction, StationActionType, StationRequestResult } from '../actions/StationAction';
import { StationRequest, StationViewModel } from '../types/Station';

export interface StationState {
  list?: StationViewModel[];
  selected?: StationViewModel;
  isLoading: boolean;
  lastRequest?: StationRequest;
  hasLastRequestFailed: boolean;
}

const defaultState: StationState = {
  isLoading: false,
  hasLastRequestFailed: false,
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
      hasLastRequestFailed: false,
      selected: undefined,
      isLoading: false,
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
  } else if (action.type === StationActionType.SetFailed) {
    return {
      ...state,
      isLoading: false,
      hasLastRequestFailed: true,
    };
  } else if (action.type === StationActionType.SetReady) {
    return {
      ...state,
      hasLastRequestFailed: false,
    };
  } else {
    return state;
  }
};

export default stationReducer;
