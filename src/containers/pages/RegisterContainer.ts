import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { RootState } from '../../reducers/RootReducer';
import RegisterScreen, {
  RegisterPageDispatchProps,
  RegisterPageStateProps,
} from '../../components/pages/RegisterPage';
import { AppThunkDispatch } from '../../store';
import { saveRegisterAction } from '../../actions/AccountAction';

const mapStateToProps: MapStateToProps<RegisterPageStateProps, Record<string, never>, RootState> = (
  state: RootState,
) => {
  return {
    isLoggedIn: state.session.jwtToken ? true : false,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  RegisterPageDispatchProps,
  Record<string, never>
> = (dispatch: AppThunkDispatch) => {
  return {
    register: (email: string, password: string) => dispatch(saveRegisterAction(email, password)),
  };
};

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

export default RegisterContainer;
