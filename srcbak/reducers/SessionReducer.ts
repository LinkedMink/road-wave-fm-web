import { decodeJwt, JWTPayload } from "jose";
import { Reducer } from "redux";
import { SessionAction, SessionActionType } from "../definitions/Actions";
import { LocalStorageKey } from "../definitions/AppConstants";
import { SessionState } from "../definitions/State";
import { SessionTokens } from "../definitions/StateModels";

const defaultState: SessionState = {
  isDestroyed: false,
};

const sessionReducer: Reducer<SessionState, SessionAction> = (
  state: SessionState = defaultState,
  action: SessionAction
): SessionState => {
  if (action.type === SessionActionType.Save) {
    const jwtToken = action.payload as string;

    let decodedToken: JWTPayload;
    try {
      decodedToken = decodeJwt(jwtToken);
    } catch (e) {
      console.error(e);
      return state;
    }

    localStorage.setItem(LocalStorageKey.AuthToken, JSON.stringify({ jwtToken, decodedToken }));
    return {
      ...state,
      isDestroyed: false,
      jwtToken,
      decodedToken,
    };
  } else if (action.type === SessionActionType.Destroy) {
    localStorage.removeItem(LocalStorageKey.AuthToken);
    return {
      ...state,
      isDestroyed: true,
      jwtToken: undefined,
      decodedToken: undefined,
    };
  } else if (action.type === SessionActionType.Restore) {
    const tokenData = localStorage.getItem(LocalStorageKey.AuthToken);
    if (!tokenData) {
      return state;
    }

    const tokenObj = JSON.parse(tokenData) as SessionTokens;
    return {
      ...state,
      ...tokenObj,
    };
  } else {
    return state;
  }
};

export default sessionReducer;
