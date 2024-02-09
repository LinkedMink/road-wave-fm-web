import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { confirmSetValue } from "../../actions/ConfirmAction";
import ConfirmDialog, {
  ConfirmDialogStateProps,
  ConfirmDialogOwnProps,
  ConfirmDialogDispatchProps,
} from "../../components/layout/ConfirmDialog";
import { RootState } from "../../reducers/RootReducer";
import { AppThunkDispatch } from "../../store";

const mapStateToProps: MapStateToProps<
  ConfirmDialogStateProps,
  ConfirmDialogOwnProps,
  RootState
> = (state: RootState) => {
  return {
    isActive: state.confirm.active ? true : false,
    text: state.confirm.active ? state.confirm.active.message : undefined,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  ConfirmDialogDispatchProps,
  ConfirmDialogOwnProps
> = (dispatch: AppThunkDispatch) => {
  return {
    confirmYes: () => dispatch(confirmSetValue(true)),
    confirmNo: () => dispatch(confirmSetValue(false)),
  };
};

const ConfirmContainer = connect(mapStateToProps, mapDispatchToProps)(ConfirmDialog);

export default ConfirmContainer;
