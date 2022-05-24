import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { alertClear } from '../../actions/AlertAction';
import AlertSnackbar, {
  AlertSnackbarDispatchProps,
  AlertSnackbarStateProps,
} from '../../components/layout/AlertSnackbar';
import { AlertSeverity } from '../../definitions/StateModels';
import { RootState } from '../../reducers/RootReducer';

const DEFAULT_AUTO_HIDE_MS = 6000;

const mapStateToProps: MapStateToProps<
  AlertSnackbarStateProps,
  Record<string, never>,
  RootState
> = (state: RootState) => {
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
  Record<string, never>
> = (dispatch: Dispatch) => {
  return {
    close: () => {
      dispatch(alertClear());
    },
  };
};

const AlertSnackbarContainer = connect(mapStateToProps, mapDispatchToProps)(AlertSnackbar);

export default AlertSnackbarContainer;
