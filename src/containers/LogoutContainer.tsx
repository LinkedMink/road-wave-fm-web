import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';

import { StorageKey } from '../types/Storage';
import { destroySession } from '../actions/AccountAction';
import { RootState } from '../reducers/RootReducer';

interface LogoutStateProps {
  isLoggedIn: boolean;
}

interface LogoutDispatchProps {
  logout: () => void;
}

type LogoutProps = LogoutStateProps & LogoutDispatchProps;

const mapStateToProps: MapStateToProps<LogoutStateProps, Record<string, never>, RootState> = (
  state: RootState,
) => {
  return {
    isLoggedIn: state.account.jwtToken ? true : false,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<LogoutDispatchProps, Record<string, never>> = (
  dispatch: Dispatch,
) => {
  return {
    logout: () => {
      localStorage.removeItem(StorageKey.AuthToken);
      dispatch(destroySession());
    },
  };
};

class Logout extends React.Component<LogoutProps> {
  render() {
    if (this.props.isLoggedIn && this.props.logout) {
      this.props.logout();
    }

    return <Redirect to="/" />;
  }
}

const LogoutContainer = connect(mapStateToProps, mapDispatchToProps)(Logout);

export default LogoutContainer;
