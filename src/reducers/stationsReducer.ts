import { StationsActionType } from "../definitions/dashboardConstants";
import { StationsAction, StationsState } from "../types/actionTypes";
import { StationsRequestResult } from "../types/requestModels";
import { StationViewModel } from "../types/responseModels";

export const STATIONS_STATE_INITIAL: StationsState = {
  list: [],
  hasLastRequestFailed: false,
};

export const stationsReducer = (state: StationsState, action: StationsAction): StationsState => {
  if (action.type === StationsActionType.STORE) {
    const requestResult = action.payload as StationsRequestResult;
    return {
      ...state,
      list: requestResult.data,
      lastRequest: requestResult.params,
      hasLastRequestFailed: false,
      selected: undefined,
    };
  } else if (action.type === StationsActionType.SELECT) {
    return {
      ...state,
      selected: action.payload as StationViewModel,
    };
  } else if (action.type === StationsActionType.SET_FAILED) {
    return {
      ...state,
      hasLastRequestFailed: true,
    };
  } else if (action.type === StationsActionType.SET_READY) {
    return {
      ...state,
      hasLastRequestFailed: false,
    };
  } else {
    return state;
  }
};
