import type { JWTPayload } from "jose";
import type { AlertActionType, AlertSeverity } from "../definitions/alertConstants";
import type { SessionActionType } from "../definitions/sharedConstants";
import type { FormatViewModel, StationViewModel } from "./responseModels";
import type { FormatsActionType, StationsActionType } from "../definitions/dashboardConstants";
import type { StationRequest, StationsRequestResult } from "./requestModels";

export interface ReducerAction<T extends string> {
  readonly type: T;
}

export interface AlertAction extends ReducerAction<AlertActionType> {
  readonly payload?: string;
}

export interface AlertState {
  readonly severity?: AlertSeverity;
  readonly message?: string;
  readonly closeInMs?: number;
}

export interface SessionAction extends ReducerAction<SessionActionType> {
  readonly payload?: string;
}

export interface SessionState {
  readonly isDestroyed?: boolean;
  readonly jwtToken?: string;
  readonly decodedToken?: JWTPayload;
}

export interface FormatsAction extends ReducerAction<FormatsActionType> {
  readonly payload?: FormatViewModel[] | string[];
}

export interface FormatsState {
  readonly map: Map<string, FormatViewModel>;
  readonly lastUpdated?: number;
  readonly selected: string[];
}

export interface StationsState {
  readonly list?: StationViewModel[];
  readonly selected?: StationViewModel;
  readonly isLoading: boolean;
  readonly lastRequest?: StationRequest;
  readonly hasLastRequestFailed: boolean;
}

export interface StationsAction extends ReducerAction<StationsActionType> {
  readonly payload: StationsRequestResult | StationViewModel | null;
}
