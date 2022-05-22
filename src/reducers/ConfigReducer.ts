import { Reducer } from 'redux';
import { LogLevel } from '../shared/LogService';
import { ConfigAction, ConfigActionType } from '../definitions/Actions';
import { ConfigData } from '../definitions/ResponseModels';
import { ConfigState } from '../definitions/State';
import { Services } from '../definitions/AppConstants';

const INITIAL_URL = new URL(window.location.href);

const defaultState: ConfigState = {
  isLoaded: false,
  urls: {
    [Services.Self]: INITIAL_URL,
    [Services.User]: INITIAL_URL,
    [Services.RoadWave]: INITIAL_URL,
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
    const urls = Object.entries(config.urls).reduce((allSvcs, [svcKey, baseUrl]) => {
      allSvcs[svcKey as Services] = new URL(baseUrl);
      return allSvcs;
    }, {} as Record<Services, URL>);
    return {
      ...state,
      isLoaded: true,
      urls: {
        ...state.urls,
        ...urls,
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
