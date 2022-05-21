import { JWTPayload } from 'jose';
import { LogLevel } from '../shared/LogService';
import { Services } from './AppConstants';
import { Coordinates } from './Map';
import { StationRequest } from './RequestModels';
import { AccountModel, FormatViewModel, StationViewModel } from './ResponseModels';
import { AlertSeverity } from './StateModels';

export interface AccountState {
  profile?: AccountModel;
}

export interface AlertState {
  severity?: AlertSeverity;
  message?: string;
  redirect?: string;
}

export interface ConfigState {
  isLoaded: boolean;
  urls: Record<Services, string>;
  signerKey: string | null;
  googleMapsApiKey: string;
  logLevelConsole: LogLevel;
  logLevelPersist: LogLevel;
}

export interface ConfirmState {
  active?: {
    key: string;
    message: string;
  };
  inactive: Record<string, unknown>;
}

export interface FormatState {
  list: FormatViewModel[];
  selected: string[];
}

export interface LoadingState {
  isLoading: boolean;
  percentComplete?: number | null;
  message?: string;
  retryTimeout: number | null;
  retryCount: number | null;
}

export interface LocationState {
  watchId?: number;
  user?: Coordinates;
  search?: Coordinates;
  hasFailedGetLocation: boolean;
}

export interface MapState {
  isInitialized: boolean;
}

export interface SessionState {
  jwtToken?: string;
  decodedToken?: JWTPayload;
}

export interface StationState {
  list?: StationViewModel[];
  selected?: StationViewModel;
  isLoading: boolean;
  lastRequest?: StationRequest;
  hasLastRequestFailed: boolean;
}
