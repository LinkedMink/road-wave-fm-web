import type { AlertActionType, AlertSeverity } from "../definitions/alertConstants";
import type { FormatsActionType, StationsActionType } from "../definitions/dashboardConstants";
import type { SessionActionType } from "../definitions/sharedConstants";
import type { StationRequest } from "./requestModels";
import type { FormatViewModel, JwtPayload, StationLocationViewModel } from "./responseModels";

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
  readonly decodedToken?: JwtPayload;
}

export interface FormatsAction extends ReducerAction<FormatsActionType> {
  readonly payload?: FormatViewModel[] | number;
}

export interface FormatsState {
  readonly list: FormatViewModel[];
  readonly lastUpdated?: number;
  readonly selected: number[];
  readonly selectedPending: Set<number>;
}

export interface StationsState {
  readonly list: StationLocationViewModel[];
  readonly selected?: StationLocationViewModel;
  readonly lastRequest?: StationRequest;
  readonly hasLastRequestFailed: boolean;
}

export interface StationsAction extends ReducerAction<StationsActionType> {
  readonly payload: StationLocationViewModel[] | StationLocationViewModel | null;
}
