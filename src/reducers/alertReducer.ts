import type { Reducer } from "react";
import type { AlertAction, AlertState } from "../types/actionTypes";
import { AlertActionType, AlertSeverity } from "../definitions/actionConstants";

const NON_CRITICAL_ALERT_CLOSE_MS = 5000;

export const ALERT_STATE_INITIAL: AlertState = {};

export const alertReducer: Reducer<AlertState, AlertAction> = (
  state: AlertState = ALERT_STATE_INITIAL,
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
  } else if (action.type === AlertActionType.SUCCESS) {
    return {
      ...state,
      severity: AlertSeverity.SUCCESS,
      message: action.payload,
      closeInMs: NON_CRITICAL_ALERT_CLOSE_MS,
    };
  } else {
    return state;
  }
};
