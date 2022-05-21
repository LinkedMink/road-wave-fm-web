import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';

import AlertDialog, {
  AlertDialogDispatchProps,
  AlertDialogStateProps,
} from '../components/AlertDialog';
import { alertClear } from '../actions/AlertAction';
import { RootState } from '../reducers/RootReducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AlertSeverity } from '../definitions/StateModels';

const mapStateToProps: MapStateToProps<AlertDialogStateProps, RouteComponentProps, RootState> = (
  state: RootState,
) => {
  return {
    isActive: state.alert.severity === AlertSeverity.Error || !!state.alert.redirect,
    title: state.alert.severity,
    text: state.alert.message,
    redirect: state.alert.redirect,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  AlertDialogDispatchProps,
  RouteComponentProps
> = (dispatch: Dispatch) => {
  return {
    close: () => {
      dispatch(alertClear());
    },
  };
};

const connected = connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
const AlertDialogPanel = withRouter(connected);

export default AlertDialogPanel;
