let bearerToken: null | string = null;
export const setBearerToken = (newBearerToken: null | string = null) =>
  (bearerToken = newBearerToken);

export const fetchAuthClient = (input: string | URL, init?: RequestInit) => {
  if (!bearerToken) {
    return null;
  }

  const authRequestInit: RequestInit = {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  return fetch(input, authRequestInit);
};
