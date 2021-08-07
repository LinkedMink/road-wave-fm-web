import { Reducer } from 'redux';
import { SessionAction } from '../actions/SessionAction';
import { JwtPayload, SessionActionType, SessionTokens } from '../types/Account';

export interface SessionState {
  jwtToken?: string;
  decodedToken?: JwtPayload;
}

const defaultState: SessionState = {};

const sessionReducer: Reducer<SessionState, SessionAction> = (
  state: SessionState = defaultState,
  action: SessionAction,
): SessionState => {
  if (action.type === SessionActionType.Save) {
    const tokens = action.payload as SessionTokens;
    return Object.assign({}, state, {
      jwtToken: tokens.jwtToken,
      decodedToken: tokens.decodedToken,
    });
  } else if (action.type === SessionActionType.Destroy) {
    return Object.assign({}, state, {
      jwtToken: undefined,
      decodedToken: undefined,
    });
  } else {
    return state;
  }
};

export default sessionReducer;
