import { LinearProgress } from "@mui/material";
import React, { useEffect } from "react";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { useNavigate } from "react-router-dom";
import { destroySession } from "../actions/SessionAction";
import { RootState } from "../reducers/RootReducer";
import { AppThunkDispatch } from "../store";

interface LogoutStateProps {
  isLoggedIn: boolean;
}

interface LogoutDispatchProps {
  logout: () => void;
}

type LogoutProps = LogoutStateProps & LogoutDispatchProps;

const Logout: React.FunctionComponent<LogoutProps> = props => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isLoggedIn) {
      props.logout();
    } else {
      navigate("/");
    }
  });

  return (
    <LinearProgress
      sx={{
        width: "80%",
      }}
    />
  );
};

const mapStateToProps: MapStateToProps<LogoutStateProps, Record<string, never>, RootState> = (
  state: RootState
) => {
  return {
    isLoggedIn: state.session.jwtToken ? true : false,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<LogoutDispatchProps, Record<string, never>> = (
  dispatch: AppThunkDispatch
) => {
  return {
    logout: () => dispatch(destroySession()),
  };
};

const LogoutContainer = connect(mapStateToProps, mapDispatchToProps)(Logout);

export default LogoutContainer;
