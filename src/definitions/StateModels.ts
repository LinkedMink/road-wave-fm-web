import { JWTPayload } from 'jose';
import { StationRequest } from './RequestModels';
import { StationViewModel } from './ResponseModels';

export enum AlertSeverity {
  Success = 'Success',
  Info = 'Info',
  Warn = 'Warning',
  Error = 'Error',
}

export interface AlertRedirect {
  message: string;
  path: string;
  severity?: AlertSeverity;
}

export enum Claim {
  Settings = 'UserSettings',
}

export interface JwtPayload {
  aud: string;
  claims: Set<Claim>;
  email: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
}

export interface SessionTokens {
  jwtToken: string;
  decodedToken: JWTPayload;
}

export interface StationRequestResult {
  params: StationRequest;
  data: StationViewModel[];
}

export interface LoadingInit {
  isProgressable: boolean;
  message: string;
}
