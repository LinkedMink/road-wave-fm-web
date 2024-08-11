import { MessageResponse, RpcErrorResponse, ValidationErrorDto } from "../types/responseModels";

const GENERIC_REQUEST_ERROR = "Service not available, please try again later.";
const COMMON_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

let bearerToken: null | string = null;
export const setBearerToken = (newBearerToken: null | string = null) =>
  (bearerToken = newBearerToken);

export const fetchClient = async (input: string | URL, init?: RequestInit) => {
  const requestInit: RequestInit = {
    ...init,
    headers: {
      ...COMMON_HEADERS,
      ...init?.headers,
    },
  };

  try {
    const response = await fetch(input, requestInit);

    if (response.status >= 500) {
      return { message: GENERIC_REQUEST_ERROR };
    }

    return response;
  } catch {
    return { message: GENERIC_REQUEST_ERROR };
  }
};

export const fetchAuthClient = async (input: string | URL, init?: RequestInit) => {
  if (!bearerToken) {
    throw new Error(
      `Attempted to make authenticated request without bearer token: ${input.toString()}`
    );
  }

  return fetchClient(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};

export const getResponseErrorMessage = (
  response: MessageResponse | ValidationErrorDto | RpcErrorResponse
) => {
  if (isMessageResponse(response)) {
    return response.message;
  }

  if (isValidationErrorResponseDto(response)) {
    return [
      ...response.formErrors,
      ...Object.entries(response.fieldErrors).map(error => error.join(": ")),
    ].join("\n");
  }

  return response.error.message;
};

export const isMessageResponse = (checked: unknown): checked is MessageResponse =>
  typeof (checked as MessageResponse)?.message === "string";

export const isValidationErrorResponseDto = (checked: unknown): checked is ValidationErrorDto =>
  !!(checked as ValidationErrorDto)?.fieldErrors;

export const isRpcErrorResponse = (checked: unknown): checked is RpcErrorResponse =>
  !!(checked as RpcErrorResponse)?.error;
