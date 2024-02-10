import { Box } from "@mui/material";
import { FunctionComponent, useContext, useEffect } from "react";
import { SessionActionType } from "../../definitions/actionConstants";
import { ConfigContext } from "../../environments/ConfigContext";
import { SessionContext } from "../../providers/SessionProvider";

interface GoogleOAuthResponse {
  clientId: string;
  credential: string;
  select_by: string;
}

declare global {
  interface Window {
    handleGoogleOAuthResponse: (response: GoogleOAuthResponse) => void;
  }
}

export const GoogleOAuthScript: FunctionComponent = () => {
  const config = useContext(ConfigContext);
  const [session, dispatch] = useContext(SessionContext);

  window.handleGoogleOAuthResponse = function handleGoogleOAuthResponse(
    response: GoogleOAuthResponse
  ) {
    dispatch({ type: SessionActionType.SAVE, payload: response.credential });
  };

  useEffect(() => {
    const googleOAuthScriptTag = document.createElement("script");
    googleOAuthScriptTag.setAttribute("src", "https://accounts.google.com/gsi/client");
    googleOAuthScriptTag.setAttribute("async", "");
    googleOAuthScriptTag.setAttribute("defer", "");
    document.body.appendChild(googleOAuthScriptTag);
  }, []);

  return (
    <Box>
      <div
        id="g_id_onload"
        data-callback={window.handleGoogleOAuthResponse.name}
        data-client_id={config.GOOGLE_OAUTH_CLIENT_ID}
        data-login_uri={`${window.location.origin}/login`}
      ></div>
      {session.isDestroyed && <div className="g_id_signout"></div>}
    </Box>
  );
};
