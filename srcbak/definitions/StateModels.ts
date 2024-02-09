import { JWTPayload } from "jose";
import { StationRequest } from "./RequestModels";
import { StationViewModel } from "./ResponseModels";

export enum AlertSeverity {
  Success = "Success",
  Info = "Info",
  Warn = "Warning",
  Error = "Error",
}

export interface AlertRedirect {
  message: string;
  path: string;
  severity?: AlertSeverity;
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
