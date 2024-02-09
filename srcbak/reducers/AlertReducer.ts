import { Reducer } from "redux";
import { AlertAction, AlertActionType } from "../definitions/Actions";
import { AlertState } from "../definitions/State";
import { AlertRedirect, AlertSeverity } from "../definitions/StateModels";

const defaultState: AlertState = {};

const accountReducer: Reducer<AlertState, AlertAction> = (
  state: AlertState = defaultState,
  action: AlertAction
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
