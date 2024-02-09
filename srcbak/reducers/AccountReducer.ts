import { Reducer } from "redux";
import { AccountAction, AccountActionType } from "../definitions/Actions";
import { AccountModel } from "../definitions/ResponseModels";
import { AccountState } from "../definitions/State";

const defaultState: AccountState = {};

const accountReducer: Reducer<AccountState, AccountAction> = (
  state: AccountState = defaultState,
  action: AccountAction
): AccountState => {
  if (action.type === AccountActionType.Store) {
    return { ...state, profile: action.payload as AccountModel };
  } else if (action.type === AccountActionType.Clear) {
    return { ...state, profile: undefined };
  } else {
    return state;
  }
};

export default accountReducer;
