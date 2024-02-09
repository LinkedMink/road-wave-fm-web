import type { JWTPayload } from "jose";
import type {
  AlertActionType,
  AlertSeverity,
  SessionActionType,
} from "../definitions/actionConstants";

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
  readonly isActive: boolean;
  readonly jwtToken?: string;
  readonly decodedToken?: JWTPayload;
}
