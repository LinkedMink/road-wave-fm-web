import { SessionAction, SessionActionType } from "../definitions/Actions";

export function saveSession(jwtToken: string): SessionAction {
  return {
    type: SessionActionType.Save,
    payload: jwtToken,
  };
}

export function destroySession(): SessionAction {
  return {
    type: SessionActionType.Destroy,
    payload: null,
  };
}

export function restoreSession(): SessionAction {
  return {
    type: SessionActionType.Restore,
    payload: null,
  };
}
