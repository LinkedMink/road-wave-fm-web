import { StationAction, StationActionType } from '../actions/StationAction';
import { StationViewModel } from '../types/Station';

export interface StationState {
  list: StationViewModel[];
}

const defaultState: StationState = {
  list: [],
};

const StationReducer = (
  state: StationState = defaultState,
  action: StationAction,
): StationState => {
  if (action.type === StationActionType.Save) {
    return {
      ...state,
      list: action.payload,
    };
  } else {
    return state;
  }
};

export default StationReducer;
