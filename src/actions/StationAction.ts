import { Action } from 'redux';
import { getJsonResponse, HttpMethods } from '../shared/RequestFactory';
import { AppThunkAction } from '../store';
import { ResponseData, Services, Routes } from '../types/Service';
import { StationRequest, StationViewModel } from '../types/Station';

export enum StationActionType {
  Save = 'STATION_SAVE',
}

export interface StationAction extends Action<StationActionType> {
  type: StationActionType;
  payload: {
    params: StationRequest;
    data: StationViewModel[];
  };
}

export function stationSave(params: StationRequest, data: StationViewModel[]): StationAction {
  return {
    type: StationActionType.Save,
    payload: {
      params,
      data,
    },
  };
}

export const fetchStationAction = (criteria: StationRequest): AppThunkAction<StationAction> => {
  return (async (dispatch, _getState) => {
    const response = await getJsonResponse<ResponseData<StationViewModel[]>>(
      dispatch,
      Services.RoadWave,
      Routes[Services.RoadWave].STATIONS,
      HttpMethods.GET,
      criteria,
    );

    if (response) {
      if (response.data.length > 0) {
        dispatch(stationSave(criteria, response.data));
      } else {
        dispatch(stationSave(criteria, []));
      }
    }
  }) as AppThunkAction;
};
