import { Services } from "./AppConstants";
import { Coordinates } from "./Map";

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

export interface AuthenticateResponse {
  token: string;
}

export interface AccountModel {
  email: string;
  password?: string;
  isEmailVerified: boolean;
  isLocked: boolean;
  isLockedDate?: Date;
  authenticationDates?: Date[];
  claims: string[];
}

export interface ConfigData {
  urls: Record<Services, string>;
  jwtPublicKey: string;
  googleMapsApiKey: string;
  googleOAuthClientId: string;
  logLevelConsole: number;
  logLevelPersist: number;
}

export interface FormatViewModel {
  id: string;
  name: string;
}

export interface StationViewModel {
  id: string;
  callSign: string;
  protocol: string;
  frequency: number;
  format: string;
  location: Coordinates;
  distance?: number;
  signalStrength?: number;
}
