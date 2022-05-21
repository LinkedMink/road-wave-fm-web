import { AlertAction, AlertActionType } from '../definitions/Actions';
import { AlertSeverity } from '../definitions/StateModels';

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
