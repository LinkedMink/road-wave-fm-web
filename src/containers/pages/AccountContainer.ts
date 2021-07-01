
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers/RootReducer';
import { Routes, Services } from '../../types/Service';
import { HttpMethods, getJsonResponse } from '../../shared/RequestFactory';
import AccountScreen, { AccountPageDispatchProps, AccountPageStateProps } from '../../components/pages/AccountPage';
import { saveAccount } from '../../actions/AccountAction';
import { alertInfo, alertRedirect } from '../../actions/AlertAction';
import { confirmClearKey, confirmOpenDialog } from '../../actions/ConfirmAction';
import { AccountModel } from '../../types/Account';

const CONFIRM_DELETE_KEY = 'AccountContainerDelete';
const CONFIRM_DELETE_MESSAGE =
  'Are you sure you want to delete your account? This cannot be undone.';
const UPDATE_SUCCESS = 'Your account has been updated successfully.';
const EMAIL_VERIFICATION_NEEDED = 'You will need to verify your email before the next login.';
const DELETE_SUCCESS = 'Your account has been deleted successfully.';

const mapStateToProps: MapStateToProps<AccountPageStateProps, Record<string, never>, RootState> = (
  state: RootState,
) => {
  return {
    profile: state.account.profile,
    deleteConfirmResult: state.confirm.inactive
      ? state.confirm.inactive[CONFIRM_DELETE_KEY] as boolean
      : undefined,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  AccountPageDispatchProps,
  Record<string, never>
> = (dispatch: Dispatch) => {
  return {
    getAccountData: () => {
      const responseHandler = (data: AccountModel) => {
        return dispatch(saveAccount(data));
      };

      return getJsonResponse(
        dispatch,
        Services.User,
        Routes[Services.User].ACCOUNT,
        responseHandler,
        HttpMethods.GET,
      );
    },
    saveAccountData: (properties: Partial<AccountModel>) => {
      const responseHandler = () => {
        let message = UPDATE_SUCCESS;
        if (properties.email) {
          message += ` ${EMAIL_VERIFICATION_NEEDED}`;
        }

        return dispatch(alertInfo(message));
      };

      return getJsonResponse(
        dispatch,
        Services.User,
        Routes[Services.User].ACCOUNT,
        responseHandler,
        HttpMethods.PUT,
        properties,
      );
    },
    deleteAccountData: () => {
      dispatch(confirmClearKey(CONFIRM_DELETE_KEY));

      const responseHandler = () => {
        return dispatch(alertRedirect(DELETE_SUCCESS, '/logout'));
      };

      return getJsonResponse(
        dispatch,
        Services.User,
        Routes[Services.User].ACCOUNT,
        responseHandler,
        HttpMethods.DELETE,
      );
    },
    deleteConfirm: () => {
      return dispatch(confirmOpenDialog(CONFIRM_DELETE_KEY, CONFIRM_DELETE_MESSAGE));
    },
    deleteConfirmClear: () => dispatch(confirmClearKey(CONFIRM_DELETE_KEY)),
  };
};

const AccountContainer = connect(mapStateToProps, mapDispatchToProps)(AccountScreen);

export default AccountContainer;
