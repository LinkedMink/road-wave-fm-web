import { FunctionComponent, useContext, useEffect } from "react";
import { Navigate, useActionData, useNavigation } from "react-router";
import { AlertActionType } from "../../definitions/alertConstants";
import { SessionActionType } from "../../definitions/sharedConstants";
import { AlertContext } from "../../providers/AlertProvider";
import { SessionContext } from "../../providers/SessionProvider";
import { LoadingOverlay } from "../layout/LoadingOverlay";
import { AuthenticateResponse, MessageResponse } from "../../types/responseModels";
import { isMessageResponse } from "../../functions/fetchAuthClient";

export const LoginSubmitComponent: FunctionComponent = () => {
  const navigation = useNavigation();
  const [session, dispatchSession] = useContext(SessionContext);
  const [_, dispatchAlert] = useContext(AlertContext);
  const data = useActionData() as MessageResponse | AuthenticateResponse;

  useEffect(() => {
    if (!data) {
      return;
    }

    if (isMessageResponse(data)) {
      dispatchAlert({ type: AlertActionType.ERROR, payload: data.message ?? "Error logging in" });
      return;
    }

    dispatchSession({ type: SessionActionType.SAVE, payload: data.token });
  }, [data, dispatchAlert, dispatchSession]);

  if (session.jwtToken) {
    return <Navigate to={"/"} />;
  }

  return <LoadingOverlay isLoading={navigation.state === "submitting"} />;
};
