import { ActionFunction, LoaderFunction } from "react-router";
import { fetchClient } from "../../../functions/fetchAuthClient";
import type { LazyRouteObject } from "../../../types/reactUtilityTypes";
import { LoginSubmitComponent } from "../LoginSubmitComponent";
import { LoginWithEthereumInit } from "./LoginWithEthereumInit";
import { LoginWithEthereumPage } from "./LoginWithEthereumPage";

const fetchLoginInitAction: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  return fetchClient(`/api/user/login/ethereum?${url.searchParams.toString()}`, {
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
    Component: LoginWithEthereumInit,
    loader: fetchLoginInitAction,
  },
  submit: {
    Component: LoginSubmitComponent,
    action: fetchLoginSubmitAction,
  },
};
