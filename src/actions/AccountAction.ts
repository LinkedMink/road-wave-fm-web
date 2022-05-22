import urlJoin from 'url-join';
import { getJsonResponse, handleGenericCatch, HttpMethods } from '../shared/RequestFactory';
import { AppThunkAction } from '../store';
import { AccountMessage } from '../definitions/Message';
import { alertInfo, alertRedirect } from './AlertAction';
import { confirmClearKey } from './ConfirmAction';
import { loadingEnd, loadingStart } from './LoadingAction';
import { AccountAction, AccountActionType } from '../definitions/Actions';
import { Services, Routes } from '../definitions/AppConstants';
import { AccountModel, ResponseData } from '../definitions/ResponseModels';

const CONFIRM_DELETE_KEY = 'AccountContainerDelete';

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

export const fetchAccountAction = (): AppThunkAction => {
  return (async (dispatch, _getState) => {
    dispatch(loadingStart());
    const response = await getJsonResponse<ResponseData<AccountModel>>(
      Services.User,
      Routes[Services.User].ACCOUNT,
      HttpMethods.GET,
    ).catch(handleGenericCatch(dispatch));

    if (response) {
      dispatch(storeAccount(response.data));
    }
    dispatch(loadingEnd());
  }) as AppThunkAction;
};

export const saveAccountAction = (properties: Partial<AccountModel>): AppThunkAction => {
  return (async (dispatch, _getState) => {
    dispatch(loadingStart());
    const response = await getJsonResponse<ResponseData<AccountModel>>(
      Services.User,
      Routes[Services.User].ACCOUNT,
      HttpMethods.PUT,
      properties,
    ).catch(handleGenericCatch(dispatch));

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

export const deleteAccountAction = (): AppThunkAction => {
  return (async (dispatch, _getState) => {
    dispatch(loadingStart());
    dispatch(confirmClearKey(CONFIRM_DELETE_KEY));

    const response = await getJsonResponse<ResponseData>(
      Services.User,
      Routes[Services.User].ACCOUNT,
      HttpMethods.DELETE,
    ).catch(handleGenericCatch(dispatch));

    if (response) {
      dispatch(clearAccount());
      dispatch(alertRedirect(AccountMessage.DELETE_SUCCESS, '/logout'));
    }

    dispatch(loadingEnd());
  }) as AppThunkAction;
};

export const fetchPasswordResetAction = (email: string): AppThunkAction => {
  return (async (dispatch, _getState) => {
    dispatch(loadingStart());
    const response = await getJsonResponse(
      Services.User,
      urlJoin(Routes[Services.User].PASSWORD, encodeURIComponent(email)),
    ).catch(handleGenericCatch(dispatch));

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
): AppThunkAction => {
  return (async (dispatch, _getState) => {
    dispatch(loadingStart());
    const response = await getJsonResponse(
      Services.User,
      Routes[Services.User].PASSWORD,
      HttpMethods.PUT,
      {
        email,
        resetToken,
        password,
      },
    ).catch(handleGenericCatch(dispatch));

    if (response) {
      dispatch(alertRedirect(AccountMessage.PASSWORD_RESET_SUCCESS, '/login'));
    }
    dispatch(loadingEnd());
  }) as AppThunkAction;
};

export const saveRegisterAction = (email: string, password: string): AppThunkAction => {
  return (async (dispatch, _getState) => {
    dispatch(loadingStart());
    const response = await getJsonResponse(
      Services.User,
      Routes[Services.User].REGISTER,
      HttpMethods.POST,
      {
        email,
        password,
      },
    ).catch(handleGenericCatch(dispatch));

    if (response) {
      dispatch(alertRedirect(AccountMessage.REGISTER_SUCCESS, '/login'));
    }
    dispatch(loadingEnd());
  }) as AppThunkAction;
};
