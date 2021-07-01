import { Reducer } from 'redux';
import { LoadingAction, LoadingActionType, LoadingInit } from '../actions/LoadingAction';

export interface LoadingState {
  isLoading: boolean;
  percentComplete?: number | null;
  message?: string;
}

const defaultState: LoadingState = {
  isLoading: false,
};

const loadingReducer: Reducer<LoadingState, LoadingAction> = (
  state: LoadingState = defaultState,
  action: LoadingAction,
): LoadingState => {
  if (action.type === LoadingActionType.Start) {
    if (state && state.isLoading) {
      return state;
    }

    const init = action.payload as LoadingInit;
    return Object.assign({}, state, {
      isLoading: true,
      percentComplete: init.isProgressable ? 0 : null,
      message: init.message,
    });
  } else if (action.type === LoadingActionType.Report) {
    const copyState = Object.assign({}, state);
    copyState.percentComplete = action.payload as number | null;
    return copyState;
  } else if (action.type === LoadingActionType.End) {
    return Object.assign({}, state, {
      isLoading: false,
      percentComplete: null,
    });
  } else {
    return state;
  }
};

export default loadingReducer;
