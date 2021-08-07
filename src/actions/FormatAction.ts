import { Action } from 'redux';
import { FormatViewModel } from '../types/Format';

export enum FormatActionType {
  Save = 'FORMAT_SAVE',
  Select = 'FORMAT_SELECT',
}

export interface FormatAction extends Action<FormatActionType> {
  type: FormatActionType;
  payload: FormatViewModel[] | string[];
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
