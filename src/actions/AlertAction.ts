import { Action } from 'redux';
import { AlertSeverity } from '../reducers/AlertReducer';

export enum AlertActionType {
  Clear = 'ALERT_CLEAR',
  Redirect = 'ALERT_REDIRECT',
  Error = 'ALERT_ERROR',
  Info = 'ALERT_INFO',
  Warn = 'ALERT_WARN',
  Success = 'ALERT_SUCCESS',
}

export interface AlertRedirect {
  message: string;
  path: string;
  severity?: AlertSeverity;
}

export interface AlertAction extends Action<AlertActionType> {
  type: AlertActionType;
  payload: AlertRedirect | string | null;
}

export function alertClear(): AlertAction {
  return {
    type: AlertActionType.Clear,
    payload: null,
  };
}

export function alertRedirect(
  message: string,
  path: string,
  severity?: AlertSeverity,
): AlertAction {
  return {
    type: AlertActionType.Redirect,
    payload: {
      message,
      path,
      severity,
    },
  };
}

export function alertError(text: string): AlertAction {
  return {
    type: AlertActionType.Error,
    payload: text,
  };
}

export function alertInfo(text: string): AlertAction {
  return {
    type: AlertActionType.Info,
    payload: text,
  };
}

export function alertWarn(text: string): AlertAction {
  return {
    type: AlertActionType.Warn,
    payload: text,
  };
}

export function alertSuccess(text: string): AlertAction {
  return {
    type: AlertActionType.Success,
    payload: text,
  };
}
