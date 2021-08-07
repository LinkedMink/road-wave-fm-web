import { AppThunkAction } from '../store';

export const retryThunkAction = (
  action: AppThunkAction,
  retryCount = 1,
  interval = 1000,
): AppThunkAction => {
  return (async (dispatch, getState) => {
    try {
      await action(dispatch, getState, undefined);
    } catch (e) {
      if (retryCount > 0) {
        setTimeout(async () => {
          await retryThunkAction(action, retryCount - 1, interval);
        }, interval);
      }
    }
  }) as AppThunkAction;
};
