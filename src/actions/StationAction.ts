import { Action } from 'redux';
import { StationViewModel } from '../types/Station';

export enum StationActionType {
  Save = 'STATION_SAVE',
}

export interface StationAction extends Action<StationActionType> {
  type: StationActionType;
  payload: StationViewModel[];
}

export function StationSave(Stations: StationViewModel[]): StationAction {
  return {
    type: StationActionType.Save,
    payload: Stations,
  };
}
