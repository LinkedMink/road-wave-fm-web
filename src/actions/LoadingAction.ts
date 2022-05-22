import { LoadingAction, LoadingActionType } from '../definitions/Actions';

export function loadingStart(isProgressable = false, message = 'Loading... '): LoadingAction {
  return {
    type: LoadingActionType.Start,
    payload: {
      isProgressable: isProgressable,
      message: message,
    },
  };
}

export function loadingReport(percentComplete: number): LoadingAction {
  return {
    type: LoadingActionType.Start,
    payload: percentComplete,
  };
}

export function loadingEnd(): LoadingAction {
  return {
    type: LoadingActionType.End,
    payload: null,
  };
}
