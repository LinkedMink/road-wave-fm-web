import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';

import AlertSnackbar, {
  AlertSnackbarDispatchProps,
  AlertSnackbarStateProps,
} from '../components/AlertSnackbar';
import { alertClear } from '../actions/AlertAction';
import { RootState } from '../reducers/RootReducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AlertSeverity } from '../reducers/AlertReducer';

const DEFAULT_AUTO_HIDE_MS = 6000;

const mapStateToProps: MapStateToProps<AlertSnackbarStateProps, RouteComponentProps, RootState> = (
  state: RootState,
) => {
  return {
    isActive:
      !!state.alert.severity &&
      state.alert.severity !== AlertSeverity.Error &&
      !state.alert.redirect,
    text: state.alert.message,
    closeInMs: DEFAULT_AUTO_HIDE_MS,
    severity: state.alert.severity,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  AlertSnackbarDispatchProps,
  RouteComponentProps
> = (dispatch: Dispatch) => {
  return {
    close: () => {
      dispatch(alertClear());
    },
  };
};

const connected = connect(mapStateToProps, mapDispatchToProps)(AlertSnackbar);
const AlertSnackbarContainer = withRouter(connected);

export default AlertSnackbarContainer;
