import { AppThunkAction } from '../store';
import { fetchConfigAction } from './ConfigAction';
import { fetchFormats } from './FormatAction';
import { loadingEnd, loadingStart } from './LoadingAction';
import { fetchMapsApi } from './MapAction';
import { restoreSessionAction } from './SessionAction';
import { retryThunkAction } from './ThunkAction';

export const initializeAction: AppThunkAction = async (dispatch, getState) => {
  const state = getState();
  if (!state.loading.isLoading) {
    dispatch(loadingStart());
  }

  if (!state.config.isLoaded) {
    return retryThunkAction(fetchConfigAction)(dispatch, getState, undefined);
  }

  restoreSessionAction(dispatch, getState, undefined);

  const pendingDependencies: Promise<void>[] = [];
  if (!state.map.isInitialized) {
    pendingDependencies.push(retryThunkAction(fetchMapsApi)(dispatch, getState, undefined));
  }
  if (!state.format.list.length) {
    pendingDependencies.push(retryThunkAction(fetchFormats)(dispatch, getState, undefined));
  }

  await Promise.all(pendingDependencies);

  dispatch(loadingEnd());
};
