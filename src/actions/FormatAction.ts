import { Action } from 'redux';
import { FormatState } from '../reducers/FormatReducer';
import { FormatViewModel } from '../types/Format';

export enum FormatActionType {
  Save = 'FORMAT_SAVE',
  Select = 'FORMAT_SELECT',
  Restore = 'FORMAT_RESTORE',
}

export interface FormatAction extends Action<FormatActionType> {
  type: FormatActionType;
  payload: FormatViewModel[] | string[] | Partial<FormatState>;
}

export function formatSave(formats: FormatViewModel[]): FormatAction {
  return {
    type: FormatActionType.Save,
    payload: formats,
  };
}

export function formatSelect(ids: string[]): FormatAction {
  return {
    type: FormatActionType.Select,
    payload: ids,
  };
}

export function formatRestore(state: Partial<FormatState>): FormatAction {
  return {
    type: FormatActionType.Restore,
    payload: state,
  };
}
