import { LoginPage } from "../components/pages/LoginPage";
import { LoginSubmitComponent } from "../components/pages/LoginSubmitComponent";
import { LogoutComponent } from "../components/pages/LogoutComponent";
import type { LazyRouteObject } from "../types/reactUtilityTypes";
import { fetchLoginAction } from "./routeActions";

export const loginRouteObjects: Record<"login" | "logout" | "loginSubmit", LazyRouteObject> = {
  login: {
    Component: LoginPage,
  },
  loginSubmit: {
    Component: LoginSubmitComponent,
    actionConstructor: fetchLoginAction,
  },
  logout: {
    Component: LogoutComponent,
  },
};
