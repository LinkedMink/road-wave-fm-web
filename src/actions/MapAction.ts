import { Action } from 'redux';
import Maps from '../shared/Maps';

export enum MapActionType {
  Init = 'MAP_INIT',
}

export interface MapAction extends Action<MapActionType> {
  type: MapActionType;
  payload: Maps;
}

export function mapInit(maps: Maps): MapAction {
  return {
    type: MapActionType.Init,
    payload: maps,
  };
}
