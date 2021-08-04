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

export enum ResponseCode {
  Success = 0,
  Failed = 1,
  RequestValidation = 10,
  DataValidation = 11,
}

export interface ResponseData<T = string> {
  status: ResponseCode;
  data: T;
}
