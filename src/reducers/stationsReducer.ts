import { StationsActionType } from "../definitions/dashboardConstants";
import { StationsAction, StationsState } from "../types/actionTypes";
import { StationViewModel } from "../types/responseModels";

export const STATIONS_STATE_INITIAL: StationsState = {
  list: [],
  hasLastRequestFailed: false,
};

export const stationsReducer = (state: StationsState, action: StationsAction): StationsState => {
  if (action.type === StationsActionType.STORE) {
    const list = action.payload as StationViewModel[];
    return {
      ...state,
      list,
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
