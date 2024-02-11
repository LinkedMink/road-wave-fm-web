import { Reducer } from "react";
import { FormatsActionType } from "../definitions/dashboardConstants";
import { LocalStorageKey } from "../definitions/sharedConstants";
import { FormatsAction, FormatsState } from "../types/actionTypes";
import { FormatViewModel } from "../types/responseModels";

export const FORMATS_STATE_INITIAL: FormatsState = {
  list: [],
  selected: new Set(),
};

export const formatsReducer: Reducer<FormatsState, FormatsAction> = (
  state: FormatsState,
  action: FormatsAction
): FormatsState => {
  if (action.type === FormatsActionType.SAVE) {
    const formats = action.payload as FormatViewModel[];
    const nextState = {
      ...state,
      list: formats.sort((a, b) => a.name.localeCompare(b.name)),
      lastUpdated: Date.now(),
    };
    localStorage.setItem(LocalStorageKey.FORMATS_STATE, JSON.stringify(nextState));
    return nextState;
  } else if (action.type === FormatsActionType.SELECT) {
    const formatId = action.payload as string;
    const selected = new Set(state.selected);
    if (selected.has(formatId)) {
      selected.delete(formatId);
    } else {
      selected.add(formatId);
    }

    const nextState = {
      ...state,
      selected,
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
