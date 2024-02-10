import { Dispatch, FunctionComponent, createContext, useReducer } from "react";
import { SESSION_STATE_INITIAL, sessionReducer } from "../reducers/sessionReducer";
import { SessionAction, SessionState } from "../types/actionTypes";
import { HasChildrenProps } from "../types/reactUtilityTypes";

export const SessionContext = createContext<[SessionState, Dispatch<SessionAction>]>([
  SESSION_STATE_INITIAL,
  () => {},
]);

export const SessionProvider: FunctionComponent<HasChildrenProps> = props => {
  const reducerState = useReducer(sessionReducer, SESSION_STATE_INITIAL);

  return <SessionContext.Provider value={reducerState}>{props.children}</SessionContext.Provider>;
};
