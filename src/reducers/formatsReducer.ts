import { Reducer } from "react";
import { FormatsActionType } from "../definitions/dashboardConstants";
import { LocalStorageKey } from "../definitions/sharedConstants";
import { FormatsAction, FormatsState } from "../types/actionTypes";
import { FormatViewModel } from "../types/responseModels";

export const FORMATS_STATE_INITIAL: FormatsState = {
  map: new Map(),
  selected: [],
};

export const formatsReducer: Reducer<FormatsState, FormatsAction> = (
  state: FormatsState,
  action: FormatsAction
): FormatsState => {
  if (action.type === FormatsActionType.SAVE) {
    const formats = action.payload as FormatViewModel[];
    const nextState = {
      ...state,
      map: new Map(formats.sort((a, b) => a.name.localeCompare(b.name)).map(f => [f.id, f])),
      lastUpdated: Date.now(),
    };
    localStorage.setItem(LocalStorageKey.FORMATS_STATE, JSON.stringify(nextState));
    return nextState;
  } else if (action.type === FormatsActionType.SELECT) {
    const nextState = {
      ...state,
      selected: action.payload as string[],
    };
    localStorage.setItem(LocalStorageKey.FORMATS_STATE, JSON.stringify(nextState));
    return nextState;
  } else if (action.type === FormatsActionType.RESTORE) {
    const storedState = localStorage.getItem(LocalStorageKey.FORMATS_STATE);
    if (!storedState) {
      return state;
    }

    const storedJson = JSON.parse(storedState) as FormatsState;
    return {
      ...state,
      ...storedJson,
    };
  } else {
    return state;
  }
};
