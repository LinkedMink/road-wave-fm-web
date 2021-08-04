import { Action } from 'redux';
import { FormatViewModel } from '../types/Format';

export enum FormatActionType {
  Save = 'FORMAT_SAVE',
}

export interface FormatAction extends Action<FormatActionType> {
  type: FormatActionType;
  payload: FormatViewModel[];
}

export function formatSave(formats: FormatViewModel[]): FormatAction {
  return {
    type: FormatActionType.Save,
    payload: formats,
  };
}
