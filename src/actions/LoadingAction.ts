import { LoadingAction, LoadingActionType } from '../definitions/Actions';
import { Defaults } from '../definitions/AppConstants';

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

export function loadingFailed(retryTimeout: number = Defaults.RETRY_TIMEOUT): LoadingAction {
  return {
    type: LoadingActionType.Failed,
    payload: retryTimeout,
  };
}

export function loadingClearFailed(): LoadingAction {
  return {
    type: LoadingActionType.Failed,
    payload: null,
  };
}

export function loadingEnd(): LoadingAction {
  return {
    type: LoadingActionType.End,
    payload: null,
  };
}
