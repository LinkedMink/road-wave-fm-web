import { Reducer } from 'redux';
import { LoadingAction, LoadingActionType, LoadingInit } from '../definitions/Actions';
import { LoadingState } from '../definitions/State';

const defaultState: LoadingState = {
  isLoading: true,
  retryTimeout: null,
  retryCount: null,
};

const loadingReducer: Reducer<LoadingState, LoadingAction> = (
  state: LoadingState = defaultState,
  action: LoadingAction,
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
  } else if (action.type === LoadingActionType.Failed) {
    return {
      ...state,
      retryTimeout: action.payload as number | null,
      retryCount: state.retryCount !== null ? state.retryCount++ : 1,
    };
  } else if (action.type === LoadingActionType.End) {
    return {
      ...state,
      isLoading: false,
      percentComplete: null,
      retryTimeout: null,
      retryCount: null,
    };
  } else {
    return state;
  }
};

export default loadingReducer;
