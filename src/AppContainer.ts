/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';

import App, { AppDispatchProps, AppStateProps } from './App';
import { StorageKey } from './types/Storage';
import { getJsonResponse } from './shared/RequestFactory';
import { ConfigData, saveConfig } from './actions/ConfigAction';
import { saveSession } from './actions/AccountAction';
import { ResponseData, Routes, Services } from './types/Service';
import { RootState } from './reducers/RootReducer';
import { decodeToken } from './shared/Token';
import { alertError } from './actions/AlertAction';
import { Account } from './types/Message';
import { FormatViewModel } from './types/Format';
import { formatSave } from './actions/FormatAction';
import store from './store';
import Maps from './shared/Maps';
import { mapInit } from './actions/MapAction';

const mapStateToProps: MapStateToProps<AppStateProps, unknown, RootState> = (state: RootState) => {
  return {
    isConfigLoaded: state.config.urls.roadWave ? true : false,
    isFormatsLoaded: state.format.list.length > 0,
    isMapsLoaded: !!state.map.reference,
    isLoggedIn: state.account.jwtToken ? true : false,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<AppDispatchProps, unknown> = (
  dispatch: Dispatch,
) => {
  return {
    getConfig: () => {
      if (process.env.LOCAL_CONFIG) {
        const localConfig = JSON.parse(process.env.LOCAL_CONFIG);
        dispatch(saveConfig(localConfig));
        return;
      }

      const responseHandler = (data: ConfigData) => {
        return dispatch(saveConfig(data));
      };

      return getJsonResponse(
        dispatch,
        Services.Self,
        Routes[Services.Self].CONFIG,
        responseHandler,
      );
    },
    getAccount: () => {
      const token = localStorage.getItem(StorageKey.AuthToken);
      if (!token) {
        return;
      }

      const decoded = decodeToken(token);
      if (decoded === null) {
        localStorage.removeItem(StorageKey.AuthToken);
        return dispatch(alertError(Account.SESSION_ERROR));
      }

      return dispatch(saveSession(token, decoded));
    },
    getFormats: () => {
      const responseHandler = (response: ResponseData<FormatViewModel[]>) => {
        return dispatch(formatSave(response.data));
      };

      return getJsonResponse(
        dispatch,
        Services.RoadWave,
        Routes[Services.RoadWave].FORMATS,
        responseHandler,
      );
    },
    getMaps: () => {
      const maps = new Maps(store.getState().config.googleMapsApiKey);
      return maps
        .loadApiScript()
        .then((m) => dispatch(mapInit(m)))
        .catch((e) => {
          console.error(e);
          dispatch(alertError('Failed to initialize maps'));
        });
    },
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
