import { connect, MapStateToProps } from 'react-redux';
import LoginPage, { LoginPageStateProps } from '../../components/pages/LoginPage';
import { RootState } from '../../reducers/RootReducer';

const mapStateToProps: MapStateToProps<LoginPageStateProps, Record<string, never>, RootState> = (
  state: RootState,
) => {
  return {
    googleOAuthClientId: state.config.googleOAuthClientId,
  };
};

const LoginContainer = connect(mapStateToProps)(LoginPage);

export default LoginContainer;
