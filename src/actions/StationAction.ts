import { Action } from 'redux';
import { getJsonResponse, HttpMethods } from '../shared/RequestFactory';
import { AppThunkAction } from '../store';
import { ResponseData, Services, Routes } from '../types/Service';
import { StationRequest, StationViewModel } from '../types/Station';

export enum StationActionType {
  Store = 'STATION_STORE',
  Select = 'STATION_SELECT',
  LoadStart = 'STATION_LOAD_START',
  LoadEnd = 'STATION_LOAD_END',
}

export interface StationRequestResult {
  params: StationRequest;
  data: StationViewModel[];
}

export interface StationAction extends Action<StationActionType> {
  type: StationActionType;
  payload: StationRequestResult | StationViewModel | null;
}

export function stationStore(params: StationRequest, data: StationViewModel[]): StationAction {
  return {
    type: StationActionType.Store,
    payload: {
      params,
      data,
    },
  };
}

export function stationSelect(data: StationViewModel): StationAction {
  return {
    type: StationActionType.Select,
    payload: data,
  };
}

export function stationLoadStart(): StationAction {
  return {
    type: StationActionType.LoadStart,
    payload: null,
  };
}

export function stationLoadEnd(): StationAction {
  return {
    type: StationActionType.LoadEnd,
    payload: null,
  };
}

export const fetchStationAction = (criteria: StationRequest): AppThunkAction<StationAction> => {
  return (async (dispatch, _getState) => {
    dispatch(stationLoadStart());
    const response = await getJsonResponse<ResponseData<StationViewModel[]>>(
      dispatch,
      Services.RoadWave,
      Routes[Services.RoadWave].STATIONS,
      HttpMethods.GET,
      criteria,
    );

    if (response) {
      if (response.data.length > 0) {
        dispatch(stationStore(criteria, response.data));
      } else {
        dispatch(stationStore(criteria, []));
      }
    }
    dispatch(stationLoadEnd());
  }) as AppThunkAction;
};
