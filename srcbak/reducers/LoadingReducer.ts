import { Reducer } from "redux";
import { LoadingAction, LoadingActionType } from "../definitions/Actions";
import { LoadingState } from "../definitions/State";
import { LoadingInit } from "../definitions/StateModels";

const defaultState: LoadingState = {
  isLoading: true,
};

const loadingReducer: Reducer<LoadingState, LoadingAction> = (
  state: LoadingState = defaultState,
  action: LoadingAction
): LoadingState => {
  if (action.type === LoadingActionType.Start) {
    if (state?.isLoading) {
      return state;
    }

    const init = action.payload as LoadingInit;
    return {
      ...state,
      isLoading: true,
      percentComplete: init.isProgressable ? 0 : null,
      message: init.message,
    };
  } else if (action.type === LoadingActionType.Report) {
    return {
      ...state,
      percentComplete: action.payload as number | null,
    };
  } else if (action.type === LoadingActionType.End) {
    return {
      ...state,
      isLoading: false,
      percentComplete: null,
    };
  } else {
    return state;
  }
};

export default loadingReducer;
