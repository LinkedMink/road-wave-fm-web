import { Dispatch, FunctionComponent, createContext, useReducer } from "react";
import { STATIONS_STATE_INITIAL, stationsReducer } from "../reducers/stationsReducer";
import { StationsAction, StationsState } from "../types/actionTypes";
import { HasChildrenProps } from "../types/reactUtilityTypes";

export const StationsContext = createContext<[StationsState, Dispatch<StationsAction>]>([
  STATIONS_STATE_INITIAL,
  (() => {}) as Dispatch<StationsAction>,
]);

export const StationsProvider: FunctionComponent<HasChildrenProps> = props => {
  const reducerState = useReducer(stationsReducer, STATIONS_STATE_INITIAL);

  return <StationsContext.Provider value={reducerState}>{props.children}</StationsContext.Provider>;
};
