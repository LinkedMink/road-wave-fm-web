
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import urlJoin from 'url-join';
import { RootState } from '../../reducers/RootReducer';
import { Routes, Services } from '../../types/Service';
import { getJsonResponse } from '../../shared/RequestFactory';
import PasswordResetScreen, { PasswordResetPageDispatchProps, PasswordResetPageStateProps } from '../../components/pages/PasswordResetPage';
import { alertRedirect } from '../../actions/AlertAction';

const SUCCESS_MESSAGE = 'A reset link has been sent. Check your email.';

const mapStateToProps: MapStateToProps<PasswordResetPageStateProps, Record<string, never>, RootState> = (
  state: RootState,
) => {
  return {
    isLoggedIn: state.account.jwtToken ? true : false,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  PasswordResetPageDispatchProps,
  Record<string, never>
> = (dispatch: Dispatch) => {
  return {
    getResetLink: (email: string) => {
      const responseHandler = () => {
        return dispatch(alertRedirect(SUCCESS_MESSAGE, '/login'));
      };

      return getJsonResponse(
        dispatch,
        Services.User,
        urlJoin(Routes[Services.User].PASSWORD, encodeURIComponent(email)),
        responseHandler,
      );
    },
  };
};

const PasswordResetContainer = connect(mapStateToProps, mapDispatchToProps)(PasswordResetScreen);

export default PasswordResetContainer;
