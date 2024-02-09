import { ConfirmAction, ConfirmActionType } from "../definitions/Actions";

export function confirmOpenDialog(key: string, message: string): ConfirmAction {
  return {
    type: ConfirmActionType.OpenDialog,
    payload: {
      key,
      message,
    },
  };
}

export function confirmClearKey(key: string): ConfirmAction {
  return {
    type: ConfirmActionType.ClearKey,
    payload: { key },
  };
}

export function confirmSetValue(value: unknown): ConfirmAction {
  return {
    type: ConfirmActionType.SetValue,
    payload: { value },
  };
}
