import { ConfirmAction, ConfirmActionType } from '../actions/ConfirmAction';

export interface ConfirmState {
  active?: {
    key: string;
    message: string;
  };
  inactive: Record<string, unknown>;
}

const defaultState: ConfirmState = {
  inactive: {},
};

const confirmReducer = (
  state: ConfirmState = defaultState,
  action: ConfirmAction,
): ConfirmState => {
  if (action.type === ConfirmActionType.ClearKey) {
    const { [action.payload.key as string]: tempKey, ...inactive } = state.inactive;
    return Object.assign({}, state, { inactive });
  } else if (action.type === ConfirmActionType.OpenDialog) {
    return Object.assign({}, state, {
      active: action.payload,
    });
  } else if (action.type === ConfirmActionType.SetValue && state.active) {
    const inactive = Object.assign({}, state.inactive);
    inactive[state.active.key] = action.payload.value;
    return Object.assign({}, state, { inactive, active: undefined });
  } else {
    return state;
  }
};

export default confirmReducer;
