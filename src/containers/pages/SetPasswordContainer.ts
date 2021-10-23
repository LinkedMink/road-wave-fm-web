import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { RootState } from '../../reducers/RootReducer';
import SetPasswordScreen, {
  SetPasswordPageDispatchProps,
  SetPasswordPageStateProps,
} from '../../components/pages/SetPasswordPage';
import { AppThunkDispatch } from '../../store';
import { savePasswordResetAction } from '../../actions/AccountAction';

const mapStateToProps: MapStateToProps<
  SetPasswordPageStateProps,
  Record<string, never>,
  RootState
> = (state: RootState) => {
  return {
    isLoggedIn: state.session.jwtToken ? true : false,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  SetPasswordPageDispatchProps,
  Record<string, never>
> = (dispatch: AppThunkDispatch) => {
  return {
    resetPassword: (email: string, resetToken: string, password: string) =>
      dispatch(savePasswordResetAction(email, resetToken, password)),
  };
};

const SetPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(SetPasswordScreen);

export default SetPasswordContainer;
