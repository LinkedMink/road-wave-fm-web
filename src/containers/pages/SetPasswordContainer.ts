
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers/RootReducer';
import { Routes, Services } from '../../types/Service';
import { HttpMethods, getJsonResponse } from '../../shared/RequestFactory';
import SetPasswordScreen, { SetPasswordPageDispatchProps, SetPasswordPageStateProps } from '../../components/pages/SetPasswordPage';
import { alertRedirect } from '../../actions/AlertAction';

const SUCCESS_MESSAGE = 'Your password has been reset.';

const mapStateToProps: MapStateToProps<SetPasswordPageStateProps, Record<string, never>, RootState> = (
  state: RootState,
) => {
  return {
    isLoggedIn: state.account.jwtToken ? true : false,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  SetPasswordPageDispatchProps,
  Record<string, never>
> = (dispatch: Dispatch) => {
  return {
    resetPassword: (email: string, resetToken: string, password: string) => {
      const requestData = {
        email,
        resetToken,
        password,
      };

      const responseHandler = () => {
        return dispatch(alertRedirect(SUCCESS_MESSAGE, '/login'));
      };

      return getJsonResponse(
        dispatch,
        Services.User,
        Routes[Services.User].PASSWORD,
        responseHandler,
        HttpMethods.PUT,
        requestData,
      );
    },
  };
};

const SetPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(SetPasswordScreen);

export default SetPasswordContainer;
