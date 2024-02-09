import { Box } from "@mui/material";
import React from "react";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { saveSession } from "../actions/SessionAction";
import { GoogleOAuthResponse } from "../definitions/ExternalModels";
import { RootState } from "../reducers/RootReducer";
import { AppThunkDispatch } from "../store";

declare global {
  interface Window {
    handleGoogleOAuthResponse: (response: GoogleOAuthResponse) => void;
  }
}

export interface GoogleOAuthStateProps {
  isSignOutRendered: boolean;
  googleOAuthClientId: string | null;
}

export interface GoogleOAuthDispatchProps {
  storeIdToken: (idToken: string) => void;
}

type GoogleOAuthProps = GoogleOAuthStateProps & GoogleOAuthDispatchProps;

const GoogleOAuthScript: React.FunctionComponent<GoogleOAuthProps> = props => {
  window.handleGoogleOAuthResponse = function handleGoogleOAuthResponse(
    response: GoogleOAuthResponse
  ) {
    props.storeIdToken(response.credential);
  };

  return (
    <Box>
      {props.googleOAuthClientId && (
        <div
          id="g_id_onload"
          data-callback={window.handleGoogleOAuthResponse.name}
          data-client_id={props.googleOAuthClientId}
          data-login_uri={`${window.location.origin}/login`}
        ></div>
      )}
      {props.isSignOutRendered && <div className="g_id_signout"></div>}
    </Box>
  );
};

const mapStateToProps: MapStateToProps<GoogleOAuthStateProps, Record<string, never>, RootState> = (
  state: RootState
) => {
  return {
    isSignOutRendered: !state.session.jwtToken && state.session.isDestroyed,
    googleOAuthClientId: state.config.googleOAuthClientId,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  GoogleOAuthDispatchProps,
  Record<string, never>
> = (dispatch: AppThunkDispatch) => {
  return {
    storeIdToken: idToken => dispatch(saveSession(idToken)),
  };
};

export const GoogleOAuthContainer = connect(mapStateToProps, mapDispatchToProps)(GoogleOAuthScript);

export default GoogleOAuthContainer;
