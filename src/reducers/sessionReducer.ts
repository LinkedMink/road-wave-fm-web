import { Reducer } from "react";
import { LocalStorageKey, SessionActionType } from "../definitions/sharedConstants";
import { SessionAction, SessionState } from "../types/actionTypes";
import { setBearerToken } from "../functions/fetchAuthClient";
import { JwtPayload } from "../types/responseModels";

export const SESSION_STATE_INITIAL: SessionState = {};

function decodeJwt(jwtToken: string) {
  const [_header, payload, _signature] = jwtToken.split(".");
  if (!payload) {
    throw new Error(`Malformed JWT: ${jwtToken}`);
  }

  return JSON.parse(atob(payload)) as JwtPayload;
}

export const sessionReducer: Reducer<SessionState, SessionAction> = (
  state: SessionState,
  action: SessionAction
): SessionState => {
  if (action.type === SessionActionType.SAVE) {
    const jwtToken = action.payload as string;

    const decodedToken = decodeJwt(jwtToken);

    setBearerToken(jwtToken);
    localStorage.setItem(LocalStorageKey.AUTH_TOKEN, JSON.stringify({ jwtToken, decodedToken }));

    return {
      ...state,
      isDestroyed: undefined,
      jwtToken,
      decodedToken,
    };
  } else if (action.type === SessionActionType.DESTROY) {
    setBearerToken();
    localStorage.removeItem(LocalStorageKey.AUTH_TOKEN);

    return {
      ...state,
      isDestroyed: true,
      jwtToken: undefined,
      decodedToken: undefined,
    };
  } else {
    // SessionActionType.RESTORE
    const tokenData = localStorage.getItem(LocalStorageKey.AUTH_TOKEN);
    if (!tokenData) {
      return state;
    }

    const tokenObj = JSON.parse(tokenData) as SessionTokens;
    if ((tokenObj.decodedToken.exp as number) * 1000 < Date.now()) {
      return state;
    }

    setBearerToken(tokenObj.jwtToken);

    return {
      ...state,
      ...tokenObj,
      isDestroyed: undefined,
    };
  }
};

interface SessionTokens {
  readonly jwtToken: string;
  readonly decodedToken: JwtPayload;
}
