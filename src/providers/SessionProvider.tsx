import { Dispatch, FunctionComponent, createContext, useReducer } from "react";
import { InitializedProviderProps } from "../types/reactUtilityTypes";
import { SESSION_STATE_INITIAL, sessionReducer } from "../reducers/sessionReducer";
import { SessionAction, SessionState } from "../types/actionTypes";

export const SessionContext = createContext<[SessionState, Dispatch<SessionAction>]>([
  SESSION_STATE_INITIAL,
  () => {},
]);

export const SessionProvider: FunctionComponent<InitializedProviderProps> = props => {
  const reducerState = useReducer(sessionReducer, SESSION_STATE_INITIAL);

  return <SessionContext.Provider value={reducerState}>{props.children}</SessionContext.Provider>;
};
