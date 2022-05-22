import { JWTPayload } from 'jose';
import { getJsonResponse, handleGenericCatch, HttpMethods } from '../shared/RequestFactory';
import { decodeToken } from '../shared/Token';
import { AppThunkAction } from '../store';
import { SessionAction, SessionActionType } from '../definitions/Actions';
import { AccountMessage } from '../definitions/Message';
import { alertError } from './AlertAction';
import { loadingStart, loadingEnd } from './LoadingAction';
import { Services, Routes, LocalStorageKey } from '../definitions/AppConstants';
import { ResponseData, AuthenticateResponse } from '../definitions/ResponseModels';

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

export const restoreSession: AppThunkAction = async (dispatch, _getState) => {
  const token = localStorage.getItem(LocalStorageKey.AuthToken);
  if (!token) {
    return;
  }

  const decoded = decodeToken(token);
  if (decoded !== null) {
    dispatch(saveSession(token, decoded));
  } else {
    localStorage.removeItem(LocalStorageKey.AuthToken);
  }
};

export const loginRequestAction = (
  email: string,
  password: string,
  rememberMe: boolean,
): AppThunkAction => {
  return (async (dispatch, _getState) => {
    dispatch(loadingStart());

    const response = await getJsonResponse<ResponseData<AuthenticateResponse>>(
      Services.User,
      Routes[Services.User].AUTHENTICATE,
      HttpMethods.POST,
      {
        email,
        password,
      },
    ).catch(handleGenericCatch(dispatch));

    if (response) {
      localStorage.removeItem(LocalStorageKey.AuthToken);
      if (rememberMe) {
        localStorage.setItem(LocalStorageKey.AuthToken, response.data.token);
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
