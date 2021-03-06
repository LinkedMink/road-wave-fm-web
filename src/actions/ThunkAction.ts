import { Defaults } from '../definitions/AppConstants';
import { AppThunkAction } from '../store';

export const retryThunkAction = <TResult>(
  action: AppThunkAction<TResult>,
  retryCount = 0,
  retryInMs = Defaults.RETRY_TIMEOUT,
  retryLimit = Defaults.RETRY_LIMIT,
): AppThunkAction<TResult> => {
  return async (dispatch, getState) => {
    try {
      const result = await action(dispatch, getState, undefined);
      return result;
    } catch (_e) {
      const retries = retryCount + 1;
      if (retries > retryLimit) {
        throw Error(`Failed to load after retrying: ${retryCount}`);
      }

      return new Promise((resolve, _reject) => {
        setTimeout(async () => {
          const nextRetryAction = retryThunkAction(action, retries, retryInMs, retryLimit);
          const result = await nextRetryAction(dispatch, getState, undefined);
          resolve(result);
        }, retryInMs);
      });
    }
  };
};
