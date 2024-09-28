import { Dispatch, FunctionComponent, createContext, useReducer } from "react";
import { ALERT_STATE_INITIAL, alertReducer } from "../../reducers/alertReducer";
import { AlertAction, AlertState } from "../../types/actionTypes";
import { HasChildrenProps } from "../../types/reactUtilityTypes";
import { AlertSnackbar } from "./AlertSnackbar";

export const AlertContext = createContext<[AlertState, Dispatch<AlertAction>]>([
  ALERT_STATE_INITIAL,
  () => {},
]);

export const AlertProvider: FunctionComponent<HasChildrenProps> = props => {
  const reducerState = useReducer(alertReducer, ALERT_STATE_INITIAL);

  return (
    <AlertContext.Provider value={reducerState}>
      <AlertSnackbar />
      {props.children}
    </AlertContext.Provider>
  );
};
