import { Action } from 'redux';
import urlJoin from 'url-join';
import { getJsonResponse, HttpMethods } from '../shared/RequestFactory';
import { AppThunkAction } from '../store';
import { AccountModel } from '../types/Account';
import { AccountMessage } from '../types/Message';
import { ResponseData, Services, Routes } from '../types/Service';
import { alertInfo, alertRedirect } from './AlertAction';
import { confirmClearKey } from './ConfirmAction';
import { loadingEnd, loadingStart } from './LoadingAction';

const CONFIRM_DELETE_KEY = 'AccountContainerDelete';

export enum AccountActionType {
  Store = 'ACCOUNT_STORE',
  Clear = 'ACCOUNT_CLEAR',
}

export interface AccountAction extends Action<AccountActionType> {
  type: AccountActionType;
  payload: null | AccountModel;
}

export function storeAccount(data: AccountModel): AccountAction {
  return {
    type: AccountActionType.Store,
    payload: data,
  };
}

export function clearAccount(): AccountAction {
  return {
    type: AccountActionType.Clear,
    payload: null,
  };
}

export const fetchAccountAction = (): AppThunkAction<AccountAction> => {
  return (async (dispatch, _getState) => {
    dispatch(loadingStart());
    const response = await getJsonResponse<ResponseData<AccountModel>>(
      dispatch,
      Services.User,
      Routes[Services.User].ACCOUNT,
      HttpMethods.GET,
    );

    if (response) {
      dispatch(storeAccount(response.data));
    }
    dispatch(loadingEnd());
  }) as AppThunkAction;
};

export const saveAccountAction = (
  properties: Partial<AccountModel>,
): AppThunkAction<AccountAction> => {
  return (async (dispatch, _getState) => {
    dispatch(loadingStart());
    const response = await getJsonResponse<ResponseData<AccountModel>>(
      dispatch,
      Services.User,
      Routes[Services.User].ACCOUNT,
      HttpMethods.PUT,
      properties,
    );

    if (response) {
      dispatch(storeAccount(response.data));
      let message = AccountMessage.UPDATE_SUCCESS;
      if (properties.email) {
        message += ` ${AccountMessage.VERIFY_NEEDED}`;
      }

      dispatch(alertInfo(message));
    }

    dispatch(loadingEnd());
  }) as AppThunkAction;
};

export const deleteAccountAction = (): AppThunkAction<AccountAction> => {
  return (async (dispatch, _getState) => {
    dispatch(loadingStart());
    dispatch(confirmClearKey(CONFIRM_DELETE_KEY));

    const response = await getJsonResponse<ResponseData>(
      dispatch,
      Services.User,
      Routes[Services.User].ACCOUNT,
      HttpMethods.DELETE,
    );

    if (response) {
      dispatch(clearAccount());
      dispatch(alertRedirect(AccountMessage.DELETE_SUCCESS, '/logout'));
    }

    dispatch(loadingEnd());
  }) as AppThunkAction;
};

export const fetchPasswordResetAction = (email: string): AppThunkAction<AccountAction> => {
  return (async (dispatch, _getState) => {
    dispatch(loadingStart());
    const response = await getJsonResponse(
      dispatch,
      Services.User,
      urlJoin(Routes[Services.User].PASSWORD, encodeURIComponent(email)),
    );

    if (response) {
      dispatch(alertRedirect(AccountMessage.PASSWORD_RESET_SENT, '/login'));
    }
    dispatch(loadingEnd());
  }) as AppThunkAction;
};

export const savePasswordResetAction = (
  email: string,
  resetToken: string,
  password: string,
): AppThunkAction<AccountAction> => {
  return (async (dispatch, _getState) => {
    dispatch(loadingStart());
    const response = await getJsonResponse(
      dispatch,
      Services.User,
      Routes[Services.User].PASSWORD,
      HttpMethods.PUT,
      {
        email,
        resetToken,
        password,
      },
    );

    if (response) {
      dispatch(alertRedirect(AccountMessage.PASSWORD_RESET_SUCCESS, '/login'));
    }
    dispatch(loadingEnd());
  }) as AppThunkAction;
};

export const saveRegisterAction = (
  email: string,
  password: string,
): AppThunkAction<AccountAction> => {
  return (async (dispatch, _getState) => {
    dispatch(loadingStart());
    const response = await getJsonResponse(
      dispatch,
      Services.User,
      Routes[Services.User].REGISTER,
      HttpMethods.POST,
      {
        email,
        password,
      },
    );

    if (response) {
      dispatch(alertRedirect(AccountMessage.REGISTER_SUCCESS, '/login'));
    }
    dispatch(loadingEnd());
  }) as AppThunkAction;
};
