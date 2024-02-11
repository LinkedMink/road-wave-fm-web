import { ActionFunction } from "react-router";
import { LoginPage } from "../components/pages/LoginPage";
import { LoginSubmitComponent } from "../components/pages/LoginSubmitComponent";
import type { LazyRouteObject } from "../types/reactUtilityTypes";

const fetchLoginAction =
  (baseUrl: string): ActionFunction =>
  async ({ request }) => {
    const formData = await request.formData();
    const formDataObj = Object.fromEntries(formData.entries());

    const response = await fetch(new URL("authenticate", baseUrl), {
      method: request.method,
      body: JSON.stringify(formDataObj),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response;
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
