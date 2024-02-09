import { Dispatch, FunctionComponent, createContext, useReducer } from "react";
import { InitializedProviderProps } from "../types/reactUtilityTypes";
import { ALERT_STATE_INITIAL, alertReducer } from "../reducers/alertReducer";
import { AlertAction, AlertState } from "../types/actionTypes";

export const AlertContext = createContext<[AlertState, Dispatch<AlertAction>]>([
  ALERT_STATE_INITIAL,
  () => {},
]);

export const AlertProvider: FunctionComponent<InitializedProviderProps> = props => {
  const reducerState = useReducer(alertReducer, ALERT_STATE_INITIAL);

  return <AlertContext.Provider value={reducerState}>{props.children}</AlertContext.Provider>;
};