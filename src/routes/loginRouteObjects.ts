import { LoginPage } from "../components/pages/LoginPage";
import { LoginSubmitComponent } from "../components/pages/LoginSubmitComponent";
import type { LazyRouteObject } from "../types/reactUtilityTypes";
import { fetchLoginAction } from "./routeActions";

export const loginRouteObjects: Record<"login" | "loginSubmit", LazyRouteObject> = {
  login: {
    Component: LoginPage,
  },
  loginSubmit: {
    Component: LoginSubmitComponent,
    actionConstructor: fetchLoginAction,
  },
};
