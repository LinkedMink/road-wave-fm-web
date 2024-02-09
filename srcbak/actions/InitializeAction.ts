import { AppThunkDispatch } from "../store";
import { fetchConfigAction } from "./ConfigAction";
import { fetchFormats } from "./FormatAction";
import { fetchMapsApi } from "./MapAction";
import { restoreSession } from "./SessionAction";
import { retryThunkAction } from "./ThunkAction";

/**
 * @todo catch init error and warn user
 * @param dispatch
 */
export const initialize = (dispatch: AppThunkDispatch) => {
  dispatch(restoreSession());
  void dispatch(retryThunkAction(fetchConfigAction));
};

/**
 * @todo catch init error and warn user
 * @param dispatch
 */
export const loadDependencies = (dispatch: AppThunkDispatch) => {
  void dispatch(retryThunkAction(fetchMapsApi));
  void dispatch(retryThunkAction(fetchFormats));
};
