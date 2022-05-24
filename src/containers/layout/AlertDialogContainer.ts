import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { alertClear } from '../../actions/AlertAction';
import AlertDialog, {
  AlertDialogDispatchProps,
  AlertDialogStateProps,
} from '../../components/layout/AlertDialog';
import { AlertSeverity } from '../../definitions/StateModels';
import { RootState } from '../../reducers/RootReducer';

const mapStateToProps: MapStateToProps<AlertDialogStateProps, Record<string, never>, RootState> = (
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
  Record<string, never>
> = (dispatch: Dispatch) => {
  return {
    close: () => {
      dispatch(alertClear());
    },
  };
};

const AlertDialogPanel = connect(mapStateToProps, mapDispatchToProps)(AlertDialog);

export default AlertDialogPanel;
