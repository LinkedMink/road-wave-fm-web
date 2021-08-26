import { Reducer } from 'redux';
import { AlertAction, AlertActionType, AlertRedirect } from '../actions/AlertAction';

export enum AlertSeverity {
  Success = 'Success',
  Info = 'Info',
  Warn = 'Warning',
  Error = 'Error',
}

export interface AlertState {
  severity?: AlertSeverity;
  message?: string;
  redirect?: string;
}

const defaultState: AlertState = {};

const accountReducer: Reducer<AlertState, AlertAction> = (
  state: AlertState = defaultState,
  action: AlertAction,
): AlertState => {
  if (action.type === AlertActionType.Clear) {
    return Object.assign({}, state, {
      severity: undefined,
      message: undefined,
      redirect: undefined,
    });
  } else if (action.type === AlertActionType.Error) {
    return Object.assign({}, state, {
      severity: AlertSeverity.Error,
      message: action.payload,
      redirect: undefined,
    });
  } else if (action.type === AlertActionType.Info) {
    return Object.assign({}, state, {
      severity: AlertSeverity.Info,
      message: action.payload,
      redirect: undefined,
    });
  } else if (action.type === AlertActionType.Warn) {
    return Object.assign({}, state, {
      severity: AlertSeverity.Warn,
      message: action.payload,
      redirect: undefined,
    });
  } else if (action.type === AlertActionType.Success) {
    return Object.assign({}, state, {
      severity: AlertSeverity.Success,
      message: action.payload,
      redirect: undefined,
    });
  } else if (action.type === AlertActionType.Redirect) {
    const alert = action.payload as AlertRedirect;
    return Object.assign({}, state, {
      severity: alert.severity ? alert.severity : AlertSeverity.Info,
      message: alert.message,
      redirect: alert.path,
    });
  } else {
    return state;
  }
};

export default accountReducer;
