import { FormatAction, FormatActionType } from '../definitions/Actions';
import { Services, Routes, LocalStorageKey } from '../definitions/AppConstants';
import { FormatViewModel, ResponseData } from '../definitions/ResponseModels';
import { FormatState } from '../definitions/State';
import { getJsonResponse } from '../shared/RequestFactory';
import { AppThunkAction } from '../store';

export function formatSave(formats: FormatViewModel[]): FormatAction {
  return {
    type: FormatActionType.Save,
    payload: formats,
  };
}

export function formatSelect(ids: string[]): FormatAction {
  return {
    type: FormatActionType.Select,
    payload: ids,
  };
}

export function formatRestore(state: Partial<FormatState>): FormatAction {
  return {
    type: FormatActionType.Restore,
    payload: state,
  };
}

export const fetchFormats: AppThunkAction = async (dispatch, _getState) => {
  const formatData = localStorage.getItem(LocalStorageKey.FormatState);
  if (formatData) {
    const formatState = JSON.parse(formatData);
    dispatch(formatRestore(formatState));
    return;
  }

  const formats = await getJsonResponse<ResponseData<FormatViewModel[]>>(
    Services.RoadWave,
    Routes[Services.RoadWave].FORMATS,
  );

  dispatch(formatSave(formats.data));
};
