import { ConfigAction, ConfigActionType } from '../definitions/Actions';
import { Services, Routes } from '../definitions/AppConstants';
import { ConfigData } from '../definitions/ResponseModels';
import { getJsonResponse } from '../shared/RequestFactory';
import { AppThunkAction } from '../store';

export function saveConfig(config: ConfigData): ConfigAction {
  return {
    type: ConfigActionType.Save,
    payload: config,
  };
}

export const fetchConfigAction: AppThunkAction = async (dispatch, _getState) => {
  const config = await getJsonResponse<ConfigData>(Services.Self, Routes[Services.Self].CONFIG);

  dispatch(saveConfig(config));
};
