import { ActionFunction } from "react-router";
import { LoginPage } from "../components/pages/LoginPage";
import { LoginSubmitComponent } from "../components/pages/LoginSubmitComponent";
import type { LazyRouteObject } from "../types/reactUtilityTypes";
import { fetchClient } from "../functions/fetchAuthClient";

const fetchLoginAction =
  (baseUrl: string): ActionFunction =>
  async ({ request }) => {
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
    actionConstructor: fetchLoginAction,
  },
};
