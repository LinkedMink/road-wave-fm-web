import { ActionFunction } from "react-router";
import { LoginPage } from "./LoginPage";
import { LoginSubmitComponent } from "./LoginSubmitComponent";
import { fetchClient } from "../../functions/fetchAuthClient";
import type { LazyRouteObject } from "../../types/reactUtilityTypes";

const fetchLoginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const formDataObj = Object.fromEntries(formData.entries());

  return fetchClient("/api/user/login", {
    method: request.method,
    body: JSON.stringify(formDataObj),
  });
};

export const loginRouteObjects: Record<"login" | "loginSubmit", LazyRouteObject> = {
  login: {
    Component: LoginPage,
  },
  loginSubmit: {
    Component: LoginSubmitComponent,
    action: fetchLoginAction,
  },
};
