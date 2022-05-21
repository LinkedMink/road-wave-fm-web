import queryString from 'query-string';
import { Action, Dispatch } from 'redux';
import urlJoin from 'url-join';

import store from '../store';
import { alertError } from '../actions/AlertAction';
import { LogService } from './LogService';
import { Services } from '../definitions/AppConstants';

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
  requestData: unknown | null = null,
  isAuthorized = true,
): RequestInit => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (isAuthorized) {
    const state = store.getState();
    if (state.session.jwtToken) {
      headers['Authorization'] = `Bearer ${state.session.jwtToken}`;
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

const responseToJson = <TResponse>() => {
  return (response: Response) => {
    return response.json() as Promise<TResponse>;
  };
};

export const handleGenericCatch = (dispatch: Dispatch) => {
  // eslint-disable-next-line react/display-name
  return (error: Error): null => {
    logger.error({
      stack: error.stack,
    });
    dispatch(alertError(GENERIC_REQUEST_ERROR));
    return null;
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

export const getJsonResponse = <TResponse = unknown, TRequest = unknown>(
  targetService: Services,
  path: string,
  method = HttpMethods.GET,
  requestData: TRequest | null = null,
  isAuthorized = true,
): Promise<TResponse> => {
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

  return fetch(url, options).then(responseToJson<TResponse>());
};
