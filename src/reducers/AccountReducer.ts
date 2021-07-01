import { Reducer } from 'redux';
import { AccountAction, AccountActionType, AccountTokens } from '../actions/AccountAction';
import { AccountModel, JwtPayload } from '../types/Account';

export interface AccountState {
  jwtToken?: string;
  decodedToken?: JwtPayload;
  profile?: AccountModel;
}

const defaultState: AccountState = {};

const accountReducer: Reducer<AccountState, AccountAction> = (
  state: AccountState = defaultState,
  action: AccountAction,
): AccountState => {
  if (action.type === AccountActionType.SaveSession) {
    const tokens = action.payload as AccountTokens;
    return Object.assign({}, state, {
      jwtToken: tokens.jwtToken,
      decodedToken: tokens.decodedToken,
    });
  } else if (action.type === AccountActionType.DestroySession) {
    return Object.assign({}, state, {
      jwtToken: undefined,
      decodedToken: undefined,
    });
  } else if (action.type === AccountActionType.SaveAccount) {
    return Object.assign({}, state, {
      profile: action.payload,
    });
  } else {
    return state;
  }
};

export default accountReducer;
