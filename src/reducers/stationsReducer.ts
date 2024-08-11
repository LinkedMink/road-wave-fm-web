import { StationsActionType } from "../definitions/dashboardConstants";
import { StationsAction, StationsState } from "../types/actionTypes";
import { StationLocationViewModel } from "../types/responseModels";

export const STATIONS_STATE_INITIAL: StationsState = {
  list: [],
  hasLastRequestFailed: false,
};

export const stationsReducer = (state: StationsState, action: StationsAction): StationsState => {
  if (action.type === StationsActionType.STORE) {
    const list = action.payload as StationLocationViewModel[];
    return {
      ...state,
      list,
      hasLastRequestFailed: false,
      selected: undefined,
    };
  } else if (action.type === StationsActionType.SELECT) {
    return {
      ...state,
      selected: action.payload as StationLocationViewModel,
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
