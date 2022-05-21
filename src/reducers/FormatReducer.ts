import { FormatAction, FormatActionType } from '../definitions/Actions';
import { LocalStorageKey } from '../definitions/AppConstants';
import { FormatViewModel } from '../definitions/ResponseModels';
import { FormatState } from '../definitions/State';

const defaultState: FormatState = {
  list: [],
  selected: [],
};

const formatReducer = (state: FormatState = defaultState, action: FormatAction): FormatState => {
  if (action.type === FormatActionType.Save) {
    const formats = action.payload as FormatViewModel[];
    const nextState = {
      ...state,
      list: formats.sort((a, b) => a.name.localeCompare(b.name)),
    };
    localStorage.setItem(LocalStorageKey.FormatState, JSON.stringify(nextState));
    return nextState;
  } else if (action.type === FormatActionType.Select) {
    const nextState = {
      ...state,
      selected: action.payload as string[],
    };
    localStorage.setItem(LocalStorageKey.FormatState, JSON.stringify(nextState));
    return nextState;
  } else if (action.type === FormatActionType.Restore) {
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return state;
  }
};

export default formatReducer;
