import { AccountPage } from "./AccountPage";
import { LogoutComponent } from "./LogoutComponent";
import type { LazyRouteObject } from "../../types/reactUtilityTypes";

export const accountRouteObjects: Record<"account" | "logout", LazyRouteObject> = {
  account: {
    Component: AccountPage,
  },
  logout: {
    Component: LogoutComponent,
  },
};
