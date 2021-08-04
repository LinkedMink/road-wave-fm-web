import { combineReducers } from 'redux';
import account from './AccountReducer';
import alert from './AlertReducer';
import config from './ConfigReducer';
import confirm from './ConfirmReducer';
import format from './FormatReducer';
import loading from './LoadingReducer';
import location from './LocationReducer';
import map from './MapReducer';
import station from './StationReducer';

const rootMap = {
  account,
  alert,
  config,
  confirm,
  format,
  loading,
  location,
  map,
  station,
};

const rootReducer = combineReducers(rootMap);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
