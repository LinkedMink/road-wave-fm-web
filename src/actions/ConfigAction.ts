import { Action } from 'redux';
import { Services } from '../types/Service';

export enum ConfigActionType {
  Save = 'CONFIG_SAVE',
  Initialize = 'CONFIG_INITIALIZE',
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
  payload: ConfigData | null;
}

export function saveConfig(config: ConfigData): ConfigAction {
  return {
    type: ConfigActionType.Save,
    payload: config,
  };
}

export function setInitialized(): ConfigAction {
  return {
    type: ConfigActionType.Initialize,
    payload: null,
  };
}
