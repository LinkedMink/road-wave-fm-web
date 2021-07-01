import { Reducer } from 'redux';
import { ConfigAction, SAVE_CONFIG } from '../actions/ConfigAction';
import { LogLevel } from '../shared/LogService';
import { Services } from '../types/Service';

export interface ConfigState {
  urls: Record<Services, string>;
  signerKey: string | null;
  googleMapsApiKey: string;
  logLevelConsole: LogLevel;
  logLevelPersist: LogLevel;
}

const defaultState: ConfigState = {
  urls: {
    [Services.Self]: '',
    [Services.User]: '',
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
  if (action.type === SAVE_CONFIG) {
    const config: ConfigState = {
      urls: action.payload.urls,
      signerKey: action.payload.jwtPublicKey ? atob(action.payload.jwtPublicKey) : null,
      googleMapsApiKey: action.payload.googleMapsApiKey,
      logLevelConsole: action.payload.logLevelConsole,
      logLevelPersist: action.payload.logLevelPersist,
    };

    return config;
  } else {
    return state;
  }
};

export default configReducer;
