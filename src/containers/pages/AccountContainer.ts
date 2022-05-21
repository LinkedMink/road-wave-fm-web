import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { RootState } from '../../reducers/RootReducer';
import AccountScreen, {
  AccountPageDispatchProps,
  AccountPageStateProps,
} from '../../components/pages/AccountPage';
import {
  deleteAccountAction,
  fetchAccountAction,
  saveAccountAction,
} from '../../actions/AccountAction';
import { confirmClearKey, confirmOpenDialog } from '../../actions/ConfirmAction';
import { AppThunkDispatch } from '../../store';
import { AccountModel } from '../../definitions/ResponseModels';

const CONFIRM_DELETE_KEY = 'AccountContainerDelete';
const CONFIRM_DELETE_MESSAGE =
  'Are you sure you want to delete your account? This cannot be undone.';

const mapStateToProps: MapStateToProps<AccountPageStateProps, Record<string, never>, RootState> = (
  state: RootState,
) => {
  return {
    profile: state.account.profile,
    deleteConfirmResult: state.confirm.inactive
      ? (state.confirm.inactive[CONFIRM_DELETE_KEY] as boolean)
      : undefined,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  AccountPageDispatchProps,
  Record<string, never>
> = (dispatch: AppThunkDispatch) => {
  return {
    getAccountData: () => dispatch(fetchAccountAction()),
    saveAccountData: (properties: Partial<AccountModel>) => dispatch(saveAccountAction(properties)),
    deleteAccountData: () => dispatch(deleteAccountAction()),
    deleteConfirm: () => dispatch(confirmOpenDialog(CONFIRM_DELETE_KEY, CONFIRM_DELETE_MESSAGE)),
    deleteConfirmClear: () => dispatch(confirmClearKey(CONFIRM_DELETE_KEY)),
  };
};

const AccountContainer = connect(mapStateToProps, mapDispatchToProps)(AccountScreen);

export default AccountContainer;
