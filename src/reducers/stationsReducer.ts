import { StationsActionType } from "../definitions/dashboardConstants";
import { StationsAction, StationsState } from "../types/actionTypes";
import { StationsRequestResult } from "../types/requestModels";
import { StationViewModel } from "../types/responseModels";

export const STATIONS_STATE_INITIAL: StationsState = {
  isLoading: false,
  hasLastRequestFailed: false,
};

export const stationsReducer = (state: StationsState, action: StationsAction): StationsState => {
  if (action.type === StationsActionType.Store) {
    const requestResult = action.payload as StationsRequestResult;
    return {
      ...state,
      list: requestResult.data,
      lastRequest: requestResult.params,
      hasLastRequestFailed: false,
      selected: undefined,
      isLoading: false,
    };
  } else if (action.type === StationsActionType.Select) {
    return {
      ...state,
      selected: action.payload as StationViewModel,
    };
  } else if (action.type === StationsActionType.LoadStart) {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === StationsActionType.LoadEnd) {
    return {
      ...state,
      isLoading: false,
    };
  } else if (action.type === StationsActionType.SetFailed) {
    return {
      ...state,
      isLoading: false,
      hasLastRequestFailed: true,
    };
  } else if (action.type === StationsActionType.SetReady) {
    return {
      ...state,
      hasLastRequestFailed: false,
    };
  } else {
    return state;
  }
};
