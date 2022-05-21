import { Reducer } from 'redux';
import { LogLevel } from '../shared/LogService';
import { ConfigAction, ConfigActionType } from '../definitions/Actions';
import { ConfigData } from '../definitions/ResponseModels';
import { ConfigState } from '../definitions/State';
import { Services } from '../definitions/AppConstants';

const defaultState: ConfigState = {
  isLoaded: false,
  urls: {
    [Services.Self]: '',
    [Services.User]: '',
    [Services.RoadWave]: '',
  },
  signerKey: null,
  googleMapsApiKey: '',
  logLevelConsole: LogLevel.Info,
  logLevelPersist: LogLevel.Warn,
};

const configReducer: Reducer<ConfigState, ConfigAction> = (
  state: ConfigState = defaultState,
  action: ConfigAction,
): ConfigState => {
  if (action.type === ConfigActionType.Save) {
    const config = action.payload as ConfigData;
    return {
      ...state,
      isLoaded: true,
      urls: {
        ...state.urls,
        ...config.urls,
      },
      signerKey: config.jwtPublicKey ? atob(config.jwtPublicKey) : null,
      googleMapsApiKey: config.googleMapsApiKey,
      logLevelConsole: config.logLevelConsole,
      logLevelPersist: config.logLevelPersist,
    };
  } else {
    return state;
  }
};

export default configReducer;
