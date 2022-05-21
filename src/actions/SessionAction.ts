import { JWTPayload } from 'jose';
import { Action } from 'redux';
import { getJsonResponse, handleGenericCatch, HttpMethods } from '../shared/RequestFactory';
import { decodeToken } from '../shared/Token';
import { AppThunkAction } from '../store';
import { AuthenticateResponse, SessionActionType, SessionTokens } from '../types/Account';
import { AccountMessage } from '../types/Message';
import { ResponseData, Services, Routes } from '../types/Service';
import { StorageKey } from '../types/Storage';
import { alertError } from './AlertAction';
import { loadingStart, loadingEnd } from './LoadingAction';

export interface SessionAction extends Action<SessionActionType> {
  type: SessionActionType;
  payload: null | SessionTokens;
}

export function saveSession(jwtToken: string, decodedToken: JWTPayload): SessionAction {
  return {
    type: SessionActionType.Save,
    payload: { jwtToken, decodedToken },
  };
}

export function destroySession(): SessionAction {
  return {
    type: SessionActionType.Destroy,
    payload: null,
  };
}

export const loginRequestAction = (
  email: string,
  password: string,
  rememberMe: boolean,
): AppThunkAction<SessionAction> => {
  return (async (dispatch, _getState) => {
    dispatch(loadingStart());

    const response = await getJsonResponse<ResponseData<AuthenticateResponse>>(
      dispatch,
      Services.User,
      Routes[Services.User].AUTHENTICATE,
      HttpMethods.POST,
      {
        email,
        password,
      },
    ).catch(handleGenericCatch(dispatch));

    if (response) {
      localStorage.removeItem(StorageKey.AuthToken);
      if (rememberMe) {
        localStorage.setItem(StorageKey.AuthToken, response.data.token);
      }

      const decoded = decodeToken(response.data.token);
      if (decoded === null) {
        return dispatch(alertError(AccountMessage.VERIFY_FAILED));
      }

      dispatch(saveSession(response.data.token, decoded));
    }

    dispatch(loadingEnd());
  }) as AppThunkAction;
};
