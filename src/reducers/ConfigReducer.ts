import { Reducer } from 'redux';
import { ConfigAction, ConfigActionType, ConfigData } from '../actions/ConfigAction';
import { LogLevel } from '../shared/LogService';
import { Services } from '../types/Service';

export interface ConfigState {
  isInitialized: boolean;
  urls: Record<Services, string>;
  signerKey: string | null;
  googleMapsApiKey: string;
  logLevelConsole: LogLevel;
  logLevelPersist: LogLevel;
}

const defaultState: ConfigState = {
  isInitialized: false,
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
      urls: {
        ...state.urls,
        ...config.urls,
      },
      signerKey: config.jwtPublicKey ? atob(config.jwtPublicKey) : null,
      googleMapsApiKey: config.googleMapsApiKey,
      logLevelConsole: config.logLevelConsole,
      logLevelPersist: config.logLevelPersist,
    };
  } else if (action.type === ConfigActionType.Initialize) {
    return {
      ...state,
      isInitialized: true,
    };
  } else {
    return state;
  }
};

export default configReducer;
