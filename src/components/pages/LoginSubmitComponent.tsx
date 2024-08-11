import { FunctionComponent, useContext, useEffect } from "react";
import { Navigate, useActionData, useNavigation } from "react-router";
import { AlertActionType } from "../../definitions/alertConstants";
import { SessionActionType } from "../../definitions/sharedConstants";
import {
  getResponseErrorMessage,
  isMessageResponse,
  isValidationErrorResponseDto,
} from "../../functions/fetchAuthClient";
import { AlertContext } from "../../providers/AlertProvider";
import { BackdropContext } from "../../providers/BackdropProvider";
import { SessionContext } from "../../providers/SessionProvider";
import {
  AuthenticateResponse,
  MessageResponse,
  ValidationErrorDto,
} from "../../types/responseModels";

export const LoginSubmitComponent: FunctionComponent = () => {
  const navigation = useNavigation();
  const { setBackdrop, clearBackdrop } = useContext(BackdropContext);
  const [session, dispatchSession] = useContext(SessionContext);
  const [_, dispatchAlert] = useContext(AlertContext);
  const data = useActionData() as ValidationErrorDto | MessageResponse | AuthenticateResponse;

  useEffect(() => {
    if (!data) {
      return;
    }

    if (isMessageResponse(data) || isValidationErrorResponseDto(data)) {
      dispatchAlert({ type: AlertActionType.ERROR, payload: getResponseErrorMessage(data) });
      return;
    }

    dispatchSession({ type: SessionActionType.SAVE, payload: data.token });
  }, [data, dispatchAlert, dispatchSession]);

  useEffect(() => {
    if (navigation.state === "submitting") {
      setBackdrop(null);
    } else {
      clearBackdrop();
    }
  }, [navigation.state, setBackdrop, clearBackdrop]);

  if (session.jwtToken) {
    return <Navigate to={"/"} />;
  }

  return null;
};
