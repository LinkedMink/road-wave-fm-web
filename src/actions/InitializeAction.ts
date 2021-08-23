import { Loader } from '@googlemaps/js-api-loader';
import { ConfigData, saveConfig, setInitialized } from './ConfigAction';
import { formatRestore, formatSave } from './FormatAction';
import { loadingEnd } from './LoadingAction';
import { mapInit } from './MapAction';
import { saveSession } from './SessionAction';
import { retryThunkAction } from './ThunkAction';
import { getJsonResponse } from '../shared/RequestFactory';
import { decodeToken } from '../shared/Token';
import { AppThunkAction } from '../store';
import { FormatViewModel } from '../types/Format';
import { ResponseData, Services, Routes } from '../types/Service';
import { StorageKey } from '../types/Storage';

const fetchConfigAction: AppThunkAction = async (dispatch, _getState) => {
  const config = await getJsonResponse<ConfigData>(
    dispatch,
    Services.Self,
    Routes[Services.Self].CONFIG,
  );

  if (config) {
    dispatch(saveConfig(config));
  } else {
    throw new Error('Failed to get config.json');
  }
};

const fetchMapsApi: AppThunkAction = async (dispatch, getState) => {
  const apiKey = getState().config.googleMapsApiKey;
  const mapsLoader = new Loader({ apiKey, libraries: ['places'] });
  await mapsLoader.load();
  dispatch(mapInit());
};

const fetchFormats: AppThunkAction = async (dispatch, _getState) => {
  const formatData = localStorage.getItem(StorageKey.FormatState);
  if (formatData) {
    const formatState = JSON.parse(formatData);
    dispatch(formatRestore(formatState));
    return;
  }

  const formats = await getJsonResponse<ResponseData<FormatViewModel[]>>(
    dispatch,
    Services.RoadWave,
    Routes[Services.RoadWave].FORMATS,
  );

  if (formats) {
    dispatch(formatSave(formats.data));
  }
};

export const initializeAction: AppThunkAction = async (dispatch, getState) => {
  dispatch(setInitialized());

  // Restore session token
  const token = localStorage.getItem(StorageKey.AuthToken);
  if (token) {
    const decoded = decodeToken(token);
    if (decoded !== null) {
      dispatch(saveSession(token, decoded));
    } else {
      localStorage.removeItem(StorageKey.AuthToken);
    }
  }

  await retryThunkAction(fetchConfigAction)(dispatch, getState, undefined);

  const mapsPromise = retryThunkAction(fetchMapsApi)(dispatch, getState, undefined);
  const formatsPromise = retryThunkAction(fetchFormats)(dispatch, getState, undefined);
  await Promise.all([mapsPromise, formatsPromise]);

  dispatch(loadingEnd());
};
