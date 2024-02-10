import { FunctionComponent, useContext, useEffect, useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SessionActionType } from "../definitions/actionConstants";
import { SessionContext } from "../providers/SessionProvider";
import { RootLayout } from "./layout/RootLayout";
import { AboutPage } from "./pages/AboutPage";
import { LoginPage } from "./pages/LoginPage";
import { LogoutComponent } from "./pages/LogoutComponent";
import { DashboardPage } from "./pages/DashboardPage";
import { AuthorizeComponent } from "./routing/AuthorizeComponent";
import { ConfigContext } from "../environments/ConfigContext";
import { fetchLoginAction } from "../routes/routeActions";
import { RootErrorBoundary } from "./routing/RootErrorBoundary";
import { LoginSubmitComponent } from "./pages/LoginSubmitComponent";

export const App: FunctionComponent = () => {
  const config = useContext(ConfigContext);
  const [_, dispatch] = useContext(SessionContext);

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          element: <RootLayout />,
          errorElement: <RootErrorBoundary />,
          children: [
            {
              path: "/",
              element: (
                <AuthorizeComponent>
                  <DashboardPage />
                </AuthorizeComponent>
              ),
              children: [
                {
                  index: true,
                  lazy: () =>
                    import("../routes/dashboardRouteObject").then(m => m.dashboardRouteObject),
                },
              ],
            },
            {
              path: "/about",
              lazy: () => import("../routes/infoRouteObject").then(m => m.infoRouteObjects.about),
              element: <AboutPage />,
            },
            {
              path: "/documents/:documentName",
              lazy: () =>
                import("../routes/infoRouteObject").then(m => m.infoRouteObjects.documents),
            },
            {
              path: "/login",
              element: <LoginPage />,
              children: [
                {
                  path: "submit",
                  element: <LoginSubmitComponent />,
                  action: fetchLoginAction(config.USER_API_BASE_URL),
                },
              ],
            },
            {
              path: "/logout",
              element: <LogoutComponent />,
            },
          ],
        },
      ]),
    []
  );

  useEffect(() => dispatch({ type: SessionActionType.RESTORE }), []);

  return <RouterProvider router={router} />;
};
