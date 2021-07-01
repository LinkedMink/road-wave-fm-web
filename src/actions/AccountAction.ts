import { Action } from 'redux';
import { AccountModel, JwtPayload } from '../types/Account';

export enum AccountActionType {
  SaveSession = 'SAVE_SESSION',
  DestroySession = 'DESTROY_SESSION',
  SaveAccount = 'SAVE_ACCOUNT',
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
    type: AccountActionType.SaveAccount,
    payload: data,
  };
}
