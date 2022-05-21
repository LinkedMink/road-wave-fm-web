import { StationAction, StationActionType } from '../definitions/Actions';
import { Services, Routes } from '../definitions/AppConstants';
import { StationRequest } from '../definitions/RequestModels';
import { StationViewModel, ResponseData } from '../definitions/ResponseModels';
import { getJsonResponse, HttpMethods } from '../shared/RequestFactory';
import { AppThunkAction } from '../store';
import { alertWarn } from './AlertAction';

const RETRY_INTERVAL = 15000;

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
