import type { Reducer } from "react";
import { AlertActionType, AlertSeverity } from "../definitions/alertConstants";
import type { AlertAction, AlertState } from "../types/actionTypes";

const NON_CRITICAL_ALERT_CLOSE_MS = 5000;

export const ALERT_STATE_INITIAL: AlertState = {};

export const alertReducer: Reducer<AlertState, AlertAction> = (
  state: AlertState,
  action: AlertAction
): AlertState => {
  if (action.type === AlertActionType.CLEAR) {
    return { ...state, severity: undefined, message: undefined, closeInMs: undefined };
  } else if (action.type === AlertActionType.ERROR) {
    return {
      ...state,
      severity: AlertSeverity.ERROR,
      message: action.payload,
      closeInMs: undefined,
    };
  } else if (action.type === AlertActionType.WARN) {
    return {
      ...state,
      severity: AlertSeverity.WARN,
      message: action.payload,
      closeInMs: undefined,
    };
  } else if (action.type === AlertActionType.INFO) {
    return {
      ...state,
      severity: AlertSeverity.INFO,
      message: action.payload,
      closeInMs: NON_CRITICAL_ALERT_CLOSE_MS,
    };
  } else {
    // AlertActionType.SUCCESS
    return {
      ...state,
      severity: AlertSeverity.SUCCESS,
      message: action.payload,
      closeInMs: NON_CRITICAL_ALERT_CLOSE_MS,
    };
  }
};
