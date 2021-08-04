import { Action } from 'redux';
import { Services } from '../types/Service';

export enum ConfigActionType {
  Save = 'CONFIG_SAVE',
}

export interface ConfigData {
  urls: Record<Services, string>;
  jwtPublicKey: string;
  googleMapsApiKey: string;
  logLevelConsole: number;
  logLevelPersist: number;
}

export interface ConfigAction extends Action<ConfigActionType> {
  type: ConfigActionType;
  payload: ConfigData;
}

export function saveConfig(config: ConfigData): ConfigAction {
  return {
    type: ConfigActionType.Save,
    payload: config,
  };
}
