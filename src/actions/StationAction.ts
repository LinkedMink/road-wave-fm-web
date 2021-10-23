import { Action } from 'redux';
import { getJsonResponse, HttpMethods } from '../shared/RequestFactory';
import { AppThunkAction } from '../store';
import { ResponseData, Services, Routes } from '../types/Service';
import { StationRequest, StationViewModel } from '../types/Station';
import { alertWarn } from './AlertAction';

const RETRY_INTERVAL = 15000;

export enum StationActionType {
  Store = 'STATION_STORE',
  Select = 'STATION_SELECT',
  LoadStart = 'STATION_LOAD_START',
  LoadEnd = 'STATION_LOAD_END',
  SetFailed = 'STATION_SET_FAILED',
  SetReady = 'STATION_SET_READY',
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

export function stationSetFailed(): StationAction {
  return {
    type: StationActionType.SetFailed,
    payload: null,
  };
}

export function stationSetReady(): StationAction {
  return {
    type: StationActionType.SetReady,
    payload: null,
  };
}

export const fetchStationAction = (criteria: StationRequest): AppThunkAction<StationAction> => {
  return (async (dispatch, _getState) => {
    dispatch(stationLoadStart());
    try {
      const response = await getJsonResponse<ResponseData<StationViewModel[]>>(
        dispatch,
        Services.RoadWave,
        Routes[Services.RoadWave].STATIONS,
        HttpMethods.GET,
        criteria,
      );

      if (response.data.length > 0) {
        dispatch(stationStore(criteria, response.data));
      } else {
        dispatch(stationStore(criteria, []));
      }
    } catch (e) {
      dispatch(stationSetFailed());
      dispatch(
        alertWarn(
          `Failed to get stations, retry in ${
            RETRY_INTERVAL / 1000
          } seconds. Check your network connection.`,
        ),
      );
      setTimeout(() => {
        dispatch(stationSetReady());
      }, RETRY_INTERVAL);
    }
  }) as AppThunkAction;
};
