import { MessageResponse } from "../types/responseModels";

let bearerToken: null | string = null;
export const setBearerToken = (newBearerToken: null | string = null) =>
  (bearerToken = newBearerToken);

export const fetchAuthClient = (input: string | URL, init?: RequestInit) => {
  if (!bearerToken) {
    throw new Error(
      `Attempted to make authenticated request without bearer token: ${input.toString()}`
    );
  }

  const authRequestInit: RequestInit = {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers,
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  return fetch(input, authRequestInit);
};

export const isMessageResponse = (checked: unknown): checked is MessageResponse =>
  typeof (checked as MessageResponse)?.message === "string";
