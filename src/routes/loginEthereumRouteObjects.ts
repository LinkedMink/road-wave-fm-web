import { ActionFunction, LoaderFunction } from "react-router";
import { LoginWithEthereumPage } from "../components/pages/LoginWithEthereumPage";
import { fetchClient } from "../functions/fetchAuthClient";
import type { LazyRouteObject } from "../types/reactUtilityTypes";

const fetchLoginInitAction: LoaderFunction = async ({ request }) => {
  return fetchClient("/api/user/login/ethereum", {
    method: request.method,
  });
};

const fetchLoginSubmitAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const formDataObj = Object.fromEntries(formData.entries());

  return fetchClient("/api/user/login/ethereum", {
    method: request.method,
    body: JSON.stringify(formDataObj),
  });
};

export const loginEthereumRouteObjects: Record<"page" | "init" | "submit", LazyRouteObject> = {
  page: {
    Component: LoginWithEthereumPage,
  },
  init: {
    Component: LoginWithEthereumPage,
    loader: fetchLoginInitAction,
  },
  submit: {
    Component: LoginWithEthereumPage,
    action: fetchLoginSubmitAction,
  },
};
