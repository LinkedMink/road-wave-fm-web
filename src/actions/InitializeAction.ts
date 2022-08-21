import { AppThunkDispatch } from '../store';
import { fetchConfigAction } from './ConfigAction';
import { fetchFormats } from './FormatAction';
import { fetchMapsApi } from './MapAction';
import { restoreSession } from './SessionAction';
import { retryThunkAction } from './ThunkAction';

export const initialize = (dispatch: AppThunkDispatch) => {
  dispatch(restoreSession());
  void dispatch(retryThunkAction(fetchConfigAction));
};

export const loadDependencies = (dispatch: AppThunkDispatch) => {
  void dispatch(retryThunkAction(fetchMapsApi));
  void dispatch(retryThunkAction(fetchFormats));
};
