import { Dispatch, FunctionComponent, createContext, useReducer } from "react";
import { InitializedProviderProps } from "../types/react";
import {
  SESSION_STATE_INITIAL,
  SessionAction,
  SessionState,
  sessionReducer,
} from "../reducers/SessionReducer";

export const SessionContext = createContext<[SessionState, Dispatch<SessionAction>]>([
  SESSION_STATE_INITIAL,
  () => {},
]);

export const SessionProvider: FunctionComponent<InitializedProviderProps> = props => {
  const reducerState = useReducer(sessionReducer, SESSION_STATE_INITIAL);

  return <SessionContext.Provider value={reducerState}>{props.children}</SessionContext.Provider>;
};
