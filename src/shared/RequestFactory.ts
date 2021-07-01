import queryString from 'query-string';
import { Action, Dispatch } from 'redux';
import urlJoin from 'url-join';

import store from '../store';
import { alertError } from '../actions/AlertAction';
import { loadingStart, loadingEnd } from '../actions/LoadingAction';
import { LogService } from './LogService';
import { ResponseCode, ResponseData, Services } from '../types/Service';
import { isAction, isString } from './TypeCheck';

const logger = LogService.get('RequestFactory');
const GENERIC_REQUEST_ERROR =
  'An error occurred while processing your request. If the problem persist, contact the administrator.';

export type ResponseHandler<TResponse = unknown, TAction extends Action = Action<unknown>> = (
  data: TResponse,
) => TAction | void;

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const getRequestOptions = (
  method = HttpMethods.GET,
  requestData: Record<string, unknown> | unknown[] | null = null,
  isAuthorized = true,
): RequestInit => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (isAuthorized) {
    const state = store.getState();
    if (state.account.jwtToken) {
      headers['Authorization'] = `Bearer ${state.account.jwtToken}`;
    }
  }

  const options = {
    method: method,
    headers: headers,
  } as RequestInit;

  if (requestData) {
    options.body = JSON.stringify(requestData);
  }

  return options;
};

const handleRawResponse = (dispatch: Dispatch, url: string, options: RequestInit) => {
  return (response: Response) => {
    if (response.status === 500) {
      logger.error({
        url,
        verb: options.method,
        body: options.body,
        response: `${response.status}: ${response.body}`,
      });
      dispatch(alertError(GENERIC_REQUEST_ERROR));
      return Promise.resolve(null);
    }

    return response.json();
  };
};

const handleServiceResponse = <T>(dispatch: Dispatch, requestSuccessFunc: ResponseHandler<T>) => {
  return (json: ResponseData<T>) => {
    if (json.status !== ResponseCode.Success && isString(json.data)) {
      dispatch(alertError(json.data));
    } else {
      const result = requestSuccessFunc(json.data);
      if (isAction(result)) {
        dispatch(result);
      }
    }

    dispatch(loadingEnd());
  };
};

const handleGenericCatch = (dispatch: Dispatch, url: string, options: RequestInit) => {
  return (error: Error) => {
    logger.error({
      url,
      verb: options.method,
      body: options.body,
      stack: error.stack,
    });
    dispatch(loadingEnd());
    dispatch(alertError(GENERIC_REQUEST_ERROR));
  };
};

export const getServiceActionUrl = (targetService: Services, path: string): string => {
  const state = store.getState();

  if (state.config.urls && state.config.urls[targetService]) {
    return urlJoin(state.config.urls[targetService], path);
  } else {
    return path;
  }
};

export const getJsonResponse = <TResponse = unknown>(
  dispatch: Dispatch,
  targetService: Services,
  path: string,
  requestSuccessFunc: ResponseHandler<TResponse>,
  method = HttpMethods.GET,
  requestData: Record<string, unknown> | unknown[] | null = null,
  isAuthorized = true,
): Promise<void> => {
  let url = getServiceActionUrl(targetService, path);

  if (requestData && method === HttpMethods.GET) {
    const query = queryString.stringify(requestData, {
      skipEmptyString: true,
    });
    url += '?' + query;
  }

  const options = getRequestOptions(
    method,
    method === HttpMethods.GET ? null : requestData,
    isAuthorized,
  );

  dispatch(loadingStart());

  return fetch(url, options)
    .then(handleRawResponse(dispatch, url, options))
    .then(handleServiceResponse(dispatch, requestSuccessFunc))
    .catch(handleGenericCatch(dispatch, url, options));
};
