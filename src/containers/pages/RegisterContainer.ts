import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers/RootReducer';
import { Routes, Services } from '../../types/Service';
import { HttpMethods, getJsonResponse } from '../../shared/RequestFactory';
import RegisterScreen, {
  RegisterPageDispatchProps,
  RegisterPageStateProps,
} from '../../components/pages/RegisterPage';
import { alertRedirect } from '../../actions/AlertAction';

const SUCCESS_MESSAGE = 'Your account has been created. Verify your email address to login.';

const mapStateToProps: MapStateToProps<RegisterPageStateProps, Record<string, never>, RootState> = (
  state: RootState,
) => {
  return {
    isLoggedIn: state.account.jwtToken ? true : false,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  RegisterPageDispatchProps,
  Record<string, never>
> = (dispatch: Dispatch) => {
  return {
    register: (email: string, password: string) => {
      const requestData = {
        email,
        password,
      };

      const responseHandler = () => {
        return dispatch(alertRedirect(SUCCESS_MESSAGE, '/login'));
      };

      return getJsonResponse(
        dispatch,
        Services.User,
        Routes[Services.User].REGISTER,
        responseHandler,
        HttpMethods.POST,
        requestData,
      );
    },
  };
};

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

export default RegisterContainer;
