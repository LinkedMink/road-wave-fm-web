import { Action } from 'redux';

export enum MapActionType {
  Init = 'MAP_INIT',
}

export interface MapAction extends Action<MapActionType> {
  type: MapActionType;
  payload: null;
}

export function mapInit(): MapAction {
  return {
    type: MapActionType.Init,
    payload: null,
  };
}
