import { AppThunkAction } from '../store';

export const retryThunkAction = (action: AppThunkAction): AppThunkAction => {
  return async (dispatch, getState) => {
    const timeout = getState().loading.retryTimeout;
    if (timeout === null) {
      return action(dispatch, getState, undefined);
    }

    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        await action(dispatch, getState, undefined);
        resolve();
      }, timeout);
    });
  };
};
