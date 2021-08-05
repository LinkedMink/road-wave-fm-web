import { Action } from 'redux';
import { MapsApi } from '../types/Map';

export enum MapActionType {
  Init = 'MAP_INIT',
}

export interface MapAction extends Action<MapActionType> {
  type: MapActionType;
  payload: MapsApi;
}

export function mapInit(maps: MapsApi): MapAction {
  return {
    type: MapActionType.Init,
    payload: maps,
  };
}
