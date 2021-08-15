import { FormatAction, FormatActionType } from '../actions/FormatAction';
import { FormatViewModel } from '../types/Format';

export interface FormatState {
  list: FormatViewModel[];
  selected: string[];
}

const defaultState: FormatState = {
  list: [],
  selected: [],
};

const formatReducer = (state: FormatState = defaultState, action: FormatAction): FormatState => {
  if (action.type === FormatActionType.Save) {
    const formats = action.payload as FormatViewModel[];
    return {
      ...state,
      list: formats.sort((a, b) => a.name.localeCompare(b.name)),
    };
  } else if (action.type === FormatActionType.Select) {
    return {
      ...state,
      selected: action.payload as string[],
    };
  } else {
    return state;
  }
};

export default formatReducer;
