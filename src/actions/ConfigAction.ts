import { Action } from 'redux';
import { Services } from '../types/Service';

export const SAVE_CONFIG = 'SAVE_CONFIG';
export type SaveConfig = 'SAVE_CONFIG';

export interface ConfigData {
  urls: Record<Services, string>;
  jwtPublicKey: string;
  googleMapsApiKey: string;
  logLevelConsole: number;
  logLevelPersist: number;
}

export interface ConfigAction extends Action<SaveConfig> {
  type: SaveConfig;
  payload: ConfigData;
}

export function saveConfig(config: ConfigData): ConfigAction {
  return {
    type: SAVE_CONFIG,
    payload: config,
  };
}
