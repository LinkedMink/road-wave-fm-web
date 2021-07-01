export enum Services {
  Self = '',
  User = 'user',
}

export type ServiceRouteMap = Record<Services, Record<string, string>>;

export const Routes: ServiceRouteMap = {
  [Services.Self]: {
    CONFIG: 'config',
  },
  [Services.User]: {
    ACCOUNT: 'account',
    AUTHENTICATE: 'authenticate',
    PASSWORD: 'password',
    REGISTER: 'register',
    SETTINGS: 'settings',
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
