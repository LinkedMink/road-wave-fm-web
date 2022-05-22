/**
 * @see https://create-react-app.dev/docs/adding-custom-environment-variables/
 */
export enum BuildEnv {
  Dev = 'development',
  Test = 'test',
  Prod = 'production',
}

export enum BuildEnvVars {
  DisableServiceWorker = 'REACT_APP_DISABLE_SERVICE_WORKER',
  EnableWebVitals = 'REACT_APP_ENABLE_WEB_VITALS',
}

export const Defaults = {
  RETRY_TIMEOUT: 5_000,
  RETRY_LIMIT: 5,
};

export const MIN_PASSWORD_LENGTH = 8;

export enum LocalStorageKey {
  AuthToken = 'AuthToken',
  FormatState = 'FormatState',
}

export enum Services {
  Self = '',
  User = 'user',
  RoadWave = 'roadWave',
}

export type ServiceRouteMap = Record<Services, Record<string, string>>;

export const Routes: ServiceRouteMap = {
  [Services.Self]: {
    CONFIG: 'config.json',
  },
  [Services.User]: {
    ACCOUNT: 'account',
    AUTHENTICATE: 'authenticate',
    PASSWORD: 'password',
    REGISTER: 'register',
    SETTINGS: 'settings',
  },
  [Services.RoadWave]: {
    FORMATS: 'formats',
    STATIONS: 'stations',
  },
};
