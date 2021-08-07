import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { RootState } from '../../reducers/RootReducer';
import PasswordResetScreen, {
  PasswordResetPageDispatchProps,
  PasswordResetPageStateProps,
} from '../../components/pages/PasswordResetPage';
import { fetchPasswordResetAction } from '../../actions/AccountAction';
import { AppThunkDispatch } from '../../store';

const mapStateToProps: MapStateToProps<
  PasswordResetPageStateProps,
  Record<string, never>,
  RootState
> = (state: RootState) => {
  return {
    isLoggedIn: state.session.jwtToken ? true : false,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  PasswordResetPageDispatchProps,
  Record<string, never>
> = (dispatch: AppThunkDispatch) => {
  return {
    getResetLink: (email: string) => dispatch(fetchPasswordResetAction(email)),
  };
};

const PasswordResetContainer = connect(mapStateToProps, mapDispatchToProps)(PasswordResetScreen);

export default PasswordResetContainer;
