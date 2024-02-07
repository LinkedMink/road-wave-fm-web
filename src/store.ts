import { configureStore } from "@reduxjs/toolkit";
import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import rootReducer, { RootState } from "./reducers/RootReducer";
import { Config } from "./config";

const store = configureStore({
  reducer: rootReducer,
  devTools: Config.DEBUG,
});

export type AppStore = typeof store;
export type AppThunkDispatch<TAction extends Action = Action> = ThunkDispatch<
  RootState,
  undefined,
  TAction
>;
export type AppThunkAction<TResult = void, TAction extends Action = Action> = ThunkAction<
  Promise<TResult>,
  RootState,
  undefined,
  TAction
>;

export default store;
