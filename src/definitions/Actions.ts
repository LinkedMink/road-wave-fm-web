import { Action } from 'redux';
import { Coordinates } from './Map';
import { AccountModel, ConfigData, FormatViewModel, StationViewModel } from './ResponseModels';
import { FormatState } from './State';
import { AlertRedirect, LoadingInit, SessionTokens, StationRequestResult } from './StateModels';

export enum AccountActionType {
  Store = 'ACCOUNT_STORE',
  Clear = 'ACCOUNT_CLEAR',
}

export interface AccountAction extends Action<AccountActionType> {
  type: AccountActionType;
  payload: null | AccountModel;
}

export enum AlertActionType {
  Clear = 'ALERT_CLEAR',
  Redirect = 'ALERT_REDIRECT',
  Error = 'ALERT_ERROR',
  Info = 'ALERT_INFO',
  Warn = 'ALERT_WARN',
  Success = 'ALERT_SUCCESS',
}

export interface AlertAction extends Action<AlertActionType> {
  type: AlertActionType;
  payload: AlertRedirect | string | null;
}

export enum ConfigActionType {
  Save = 'CONFIG_SAVE',
}

export interface ConfigAction extends Action<ConfigActionType> {
  type: ConfigActionType;
  payload: ConfigData | null;
}

export enum ConfirmActionType {
  ClearKey = 'CONFIRM_CLEAR_KEY',
  OpenDialog = 'CONFIRM_OPEN_DIALOG',
  SetValue = 'CONFIRM_SET_VALUE',
}

export interface ConfirmData {
  key?: string;
  message?: string;
  value?: unknown;
}

export interface ConfirmAction extends Action<ConfirmActionType> {
  type: ConfirmActionType;
  payload: ConfirmData;
}

export enum FormatActionType {
  Save = 'FORMAT_SAVE',
  Select = 'FORMAT_SELECT',
  Restore = 'FORMAT_RESTORE',
}

export interface FormatAction extends Action<FormatActionType> {
  type: FormatActionType;
  payload: FormatViewModel[] | string[] | Partial<FormatState>;
}

export enum LoadingActionType {
  Start = 'LOADING_START',
  Report = 'LOADING_REPORT',
  Failed = 'LOADING_FAILED',
  End = 'LOADING_END',
}

export interface LoadingAction extends Action<LoadingActionType> {
  type: LoadingActionType;
  payload: number | null | LoadingInit;
}

export enum LocationActionType {
  LocationUserSet = 'LOCATION_USER_SET',
  LocationSearchSet = 'LOCATION_SEARCH_SET',
  LocationSearchClear = 'LOCATION_SEARCH_CLEAR',
  LocationWatchIdSet = 'LOCATION_WATCH_ID_SET',
  LocationWatchIdClear = 'LOCATION_WATCH_ID_CLEAR',
  LocationWatchFailed = 'LOCATION_FAILED',
}

export interface LocationAction extends Action<LocationActionType> {
  type: LocationActionType;
  payload: null | number | Coordinates;
}

export enum MapActionType {
  Init = 'MAP_INIT',
}

export interface MapAction extends Action<MapActionType> {
  type: MapActionType;
  payload: null;
}

export enum SessionActionType {
  Save = 'SESSION_SAVE',
  Destroy = 'SESSION_DESTROY',
}

export interface SessionAction extends Action<SessionActionType> {
  type: SessionActionType;
  payload: null | SessionTokens;
}

export enum StationActionType {
  Store = 'STATION_STORE',
  Select = 'STATION_SELECT',
  LoadStart = 'STATION_LOAD_START',
  LoadEnd = 'STATION_LOAD_END',
  SetFailed = 'STATION_SET_FAILED',
  SetReady = 'STATION_SET_READY',
}

export interface StationAction extends Action<StationActionType> {
  type: StationActionType;
  payload: StationRequestResult | StationViewModel | null;
}
