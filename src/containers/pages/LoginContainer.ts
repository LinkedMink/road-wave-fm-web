
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers/RootReducer';
import { StorageKey } from '../../types/Storage';
import { Routes, Services } from '../../types/Service';
import { HttpMethods, getJsonResponse } from '../../shared/RequestFactory';
import LoginScreen, { LoginPageDispatchProps, LoginPageStateProps } from '../../components/pages/LoginPage';
import { saveSession } from '../../actions/AccountAction';
import { decodeToken } from '../../shared/Token';
import { alertError } from '../../actions/AlertAction';
import { Account } from '../../types/Message';
import { AuthenticateResponse } from '../../types/Account';

const mapStateToProps: MapStateToProps<LoginPageStateProps, unknown, RootState> = (
  state: RootState,
) => {
  return {
    isLoggedIn: state.account.jwtToken ? true : false,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  LoginPageDispatchProps,
  unknown
> = (dispatch: Dispatch) => {
  return {
    login: (email: string, password: string, rememberMe: boolean) => {
      const requestData = {
        email,
        password,
      };

      const responseHandler = (data: AuthenticateResponse) => {
        localStorage.removeItem(StorageKey.AuthToken);
        if (rememberMe) {
          localStorage.setItem(StorageKey.AuthToken, data.token);
        }

        const decoded = decodeToken(data.token);
        if (decoded === null) {
          return dispatch(alertError(Account.VERIFY_FAILED));
        }

        return dispatch(saveSession(data.token, decoded));
      };

      return getJsonResponse(
        dispatch,
        Services.User,
        Routes[Services.User].AUTHENTICATE,
        responseHandler,
        HttpMethods.POST,
        requestData,
      );
    },
  };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

export default LoginContainer;
