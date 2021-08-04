import { FormatAction, FormatActionType } from '../actions/FormatAction';
import { FormatSelection } from '../types/Format';

export interface FormatState {
  list: FormatSelection[];
}

const defaultState: FormatState = {
  list: [],
};

const formatReducer = (state: FormatState = defaultState, action: FormatAction): FormatState => {
  if (action.type === FormatActionType.Save) {
    return {
      ...state,
      list: action.payload.map((f) => ({ ...f, isSelected: false })),
    };
  } else {
    return state;
  }
};

export default formatReducer;
