import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { RootState } from '../../reducers/RootReducer';
import LoginScreen, {
  LoginPageDispatchProps,
  LoginPageStateProps,
} from '../../components/pages/LoginPage';
import { loginRequestAction } from '../../actions/SessionAction';
import { AppThunkDispatch } from '../../store';

const mapStateToProps: MapStateToProps<LoginPageStateProps, unknown, RootState> = (
  state: RootState,
) => {
  return {
    isLoggedIn: state.session.jwtToken ? true : false,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<LoginPageDispatchProps, unknown> = (
  dispatch: AppThunkDispatch,
) => {
  return {
    login: (email: string, password: string, rememberMe: boolean) =>
      dispatch(loginRequestAction(email, password, rememberMe)),
  };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

export default LoginContainer;
