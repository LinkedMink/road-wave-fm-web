import { FunctionComponent, useContext, useEffect } from "react";
import { Navigate, useActionData } from "react-router";
import { AlertActionType } from "../../definitions/alertConstants";
import { SessionActionType } from "../../definitions/sharedConstants";
import {
  getResponseErrorMessage,
  isMessageResponse,
  isValidationErrorResponseDto,
} from "../../functions/fetchAuthClient";
import { AlertContext } from "../shared/AlertProvider";
import { SessionContext } from "../shared/SessionProvider";
import {
  AuthenticateResponse,
  MessageResponse,
  ValidationErrorDto,
} from "../../types/responseModels";

export const LoginSubmitComponent: FunctionComponent = () => {
  const [session, dispatchSession] = useContext(SessionContext);
  const [_, dispatchAlert] = useContext(AlertContext);
  const data = useActionData() as
    | ValidationErrorDto
    | MessageResponse
    | AuthenticateResponse
    | undefined;

  if (!data || session.jwtToken) {
    return <Navigate to={"/"} />;
  }

  useEffect(() => {
    if (isMessageResponse(data) || isValidationErrorResponseDto(data)) {
      dispatchAlert({ type: AlertActionType.ERROR, payload: getResponseErrorMessage(data) });
      return;
    }

    dispatchSession({ type: SessionActionType.SAVE, payload: data.token });
  }, [data, dispatchAlert, dispatchSession]);

  return null;
};
