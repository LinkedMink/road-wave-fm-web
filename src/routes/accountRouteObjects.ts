import { AccountPage } from "../components/pages/AccountPage";
import { LogoutComponent } from "../components/pages/LogoutComponent";
import type { LazyRouteObject } from "../types/reactUtilityTypes";

export const accountRouteObjects: Record<"account" | "logout", LazyRouteObject> = {
  account: {
    Component: AccountPage,
  },
  logout: {
    Component: LogoutComponent,
  },
};
