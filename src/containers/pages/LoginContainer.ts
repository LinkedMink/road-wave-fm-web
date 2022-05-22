import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { loginRequestAction } from '../../actions/SessionAction';
import LoginPage, {
  LoginPageDispatchProps,
  LoginPageStateProps,
} from '../../components/pages/LoginPage';
import { RootState } from '../../reducers/RootReducer';
import { AppThunkDispatch } from '../../store';

const mapStateToProps: MapStateToProps<LoginPageStateProps, Record<string, never>, RootState> = (
  state: RootState,
) => {
  return {
    isLoggedIn: state.session.jwtToken ? true : false,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  LoginPageDispatchProps,
  Record<string, never>
> = (dispatch: AppThunkDispatch) => {
  return {
    login: (email: string, password: string, rememberMe: boolean) =>
      dispatch(loginRequestAction(email, password, rememberMe)),
  };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default LoginContainer;
