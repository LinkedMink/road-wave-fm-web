import { Action } from 'redux';
import { AccountModel, JwtPayload } from '../types/Account';

export enum AccountActionType {
  SaveSession = 'ACCOUNT_SAVE_SESSION',
  DestroySession = 'ACCOUNT_DESTROY_SESSION',
  Save = 'ACCOUNT_SAVE',
}

export interface AccountTokens {
  jwtToken: string;
  decodedToken: JwtPayload;
}

export interface AccountAction extends Action<AccountActionType> {
  type: AccountActionType;
  payload: null | AccountModel | AccountTokens;
}

export function saveSession(jwtToken: string, decodedToken: JwtPayload): AccountAction {
  return {
    type: AccountActionType.SaveSession,
    payload: { jwtToken, decodedToken },
  };
}

export function destroySession(): AccountAction {
  return {
    type: AccountActionType.DestroySession,
    payload: null,
  };
}

export function saveAccount(data: AccountModel): AccountAction {
  return {
    type: AccountActionType.Save,
    payload: data,
  };
}
