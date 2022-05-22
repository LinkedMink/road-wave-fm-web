import { AppThunkDispatch } from '../store';
import { fetchConfigAction } from './ConfigAction';
import { fetchFormats } from './FormatAction';
import { fetchMapsApi } from './MapAction';
import { restoreSessionAction } from './SessionAction';
import { retryThunkAction } from './ThunkAction';

export const initialize = (dispatch: AppThunkDispatch) => {
  dispatch(restoreSessionAction);
  dispatch(retryThunkAction(fetchConfigAction));
};

export const loadDependencies = (dispatch: AppThunkDispatch) => {
  dispatch(retryThunkAction(fetchMapsApi));
  dispatch(retryThunkAction(fetchFormats));
};
