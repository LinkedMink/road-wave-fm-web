import { FunctionComponent, useContext, useEffect } from "react";
import { Navigate, useActionData, useNavigation } from "react-router";
import { AlertActionType, SessionActionType } from "../../definitions/actionConstants";
import { AlertContext } from "../../providers/AlertProvider";
import { LoadingOverlay } from "../layout/LoadingOverlay";
import { SessionContext } from "../../providers/SessionProvider";

export const LoginSubmitComponent: FunctionComponent = () => {
  const navigation = useNavigation();
  const [session, dispatchSession] = useContext(SessionContext);
  const [_, dispatchAlert] = useContext(AlertContext);
  const data = useActionData() as { token?: string; message?: string };

  useEffect(() => {
    if (!data) {
      return;
    }

    const token = data.token;
    if (!token) {
      dispatchAlert({ type: AlertActionType.ERROR, payload: data.message ?? "Error logging in" });
      return;
    }

    dispatchSession({ type: SessionActionType.SAVE, payload: token });
  }, [data]);

  if (session.jwtToken) {
    return <Navigate to={"/"} />;
  }

  return <LoadingOverlay isLoading={navigation.state === "submitting"} />;
};
