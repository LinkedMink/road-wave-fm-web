import { Reducer } from 'redux';
import { SessionAction, SessionActionType } from '../definitions/Actions';
import { LocalStorageKey } from '../definitions/AppConstants';
import { SessionState } from '../definitions/State';
import { SessionTokens } from '../definitions/StateModels';

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
    localStorage.removeItem(LocalStorageKey.AuthToken);
    return Object.assign({}, state, {
      jwtToken: undefined,
      decodedToken: undefined,
    });
  } else {
    return state;
  }
};

export default sessionReducer;
