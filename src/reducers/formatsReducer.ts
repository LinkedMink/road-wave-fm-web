import { Reducer } from "react";
import { FormatsActionType } from "../definitions/dashboardConstants";
import { LocalStorageKey } from "../definitions/sharedConstants";
import { FormatsAction, FormatsState } from "../types/actionTypes";
import { FormatViewModel } from "../types/responseModels";

export const FORMATS_STATE_INITIAL: FormatsState = {
  list: [],
  selected: [],
  selectedPending: new Set(),
};

const setFormatsLocalStorage = (state: FormatsState) => {
  localStorage.setItem(
    LocalStorageKey.FORMATS_STATE,
    JSON.stringify({
      list: state.list,
      selected: state.selected,
      lastUpdated: state.lastUpdated,
    })
  );
};

export const formatsReducer: Reducer<FormatsState, FormatsAction> = (
  state: FormatsState,
  action: FormatsAction
): FormatsState => {
  if (action.type === FormatsActionType.SAVE) {
    // const formats = action.payload as FormatViewModel[];
    // const list = formats.sort((a, b) => a.name.localeCompare(b.name));
    const nextState = {
      ...state,
      list: action.payload as FormatViewModel[],
      lastUpdated: Date.now(),
    };

    setFormatsLocalStorage(nextState);

    return nextState;
  } else if (action.type === FormatsActionType.SELECT) {
    const formatId = action.payload as number;
    const selectedPending = new Set(state.selectedPending);
    if (selectedPending.has(formatId)) {
      selectedPending.delete(formatId);
    } else {
      selectedPending.add(formatId);
    }

    const nextState = {
      ...state,
      selectedPending,
    };

    return nextState;
  } else if (action.type === FormatsActionType.SELECT_CONFIRM) {
    const nextState = {
      ...state,
      selected: Array.from(state.selectedPending),
    };

    setFormatsLocalStorage(nextState);

    return nextState;
  } else if (action.type === FormatsActionType.SELECT_CANCEL) {
    const nextState = {
      ...state,
      selectedPending: new Set(state.selected),
    };

    return nextState;
  } else {
    // FormatsActionType.RESTORE
    const storedState = localStorage.getItem(LocalStorageKey.FORMATS_STATE);
    if (!storedState) {
      return {
        ...state,
        lastUpdated: 0,
      };
    }

    const storedJson = JSON.parse(storedState) as Omit<FormatsState, "selectedPending">;
    return {
      ...state,
      ...storedJson,
      selectedPending: new Set(storedJson.selected),
    };
  }
};
