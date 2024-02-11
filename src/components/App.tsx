import { FunctionComponent, useContext, useEffect, useMemo } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { SessionActionType } from "../definitions/sharedConstants";
import { ConfigContext } from "../environments/ConfigContext";
import { SessionContext } from "../providers/SessionProvider";
import { RootLayout } from "./layout/RootLayout";
import { AuthorizeComponent } from "./routing/AuthorizeComponent";
import { RootErrorBoundary } from "./routing/RootErrorBoundary";

export const App: FunctionComponent = () => {
  const config = useContext(ConfigContext);
  const [_, dispatch] = useContext(SessionContext);

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          element: <RootLayout />,
          errorElement: (
            <RootLayout>
              <RootErrorBoundary />
            </RootLayout>
          ),
          children: [
            {
              path: "/",
              element: <AuthorizeComponent />,
              children: [
                {
                  lazy: () =>
                    import("../routes/dashboardRouteObject").then(m => m.dashboardRouteObject.root),
                  children: [
                    {
                      path: "",
                      lazy: () =>
                        import("../routes/dashboardRouteObject").then(
                          m => m.dashboardRouteObject.stations
                        ),
                    },
                    {
                      path: "stations/:lat/:lng",
                      lazy: () =>
                        import("../routes/dashboardRouteObject").then(
                          m => m.dashboardRouteObject.stations
                        ),
                    },
                    {
                      path: "formats",
                      lazy: () =>
                        import("../routes/dashboardRouteObject").then(
                          m => m.dashboardRouteObject.formats
                        ),
                    },
                  ],
                },
              ],
            },
            {
              path: "/account",
              element: <AuthorizeComponent />,
              children: [
                {
                  index: true,
                  lazy: () =>
                    import("../routes/accountRouteObjects").then(
                      m => m.accountRouteObjects.account
                    ),
                },
              ],
            },
            {
              path: "/about",
              lazy: () => import("../routes/infoRouteObject").then(m => m.infoRouteObjects.about),
            },
            {
              path: "/documents/:documentName",
              lazy: () =>
                import("../routes/infoRouteObject").then(m => m.infoRouteObjects.documents),
            },
            {
              path: "/login",
              lazy: () =>
                import("../routes/loginRouteObjects").then(m => m.loginRouteObjects.login),
              children: [
                {
                  path: "submit",
                  lazy: () =>
                    import("../routes/loginRouteObjects").then(m => ({
                      Component: m.loginRouteObjects.loginSubmit.Component,
                      action: m.loginRouteObjects.loginSubmit.actionConstructor!(
                        config.USER_API_BASE_URL
                      ),
                    })),
                },
              ],
            },
            {
              path: "/logout",
              lazy: () =>
                import("../routes/accountRouteObjects").then(m => m.accountRouteObjects.logout),
            },
            {
              path: "*",
              element: <Navigate to={"/"} />,
            },
          ],
        },
      ]),
    [config.USER_API_BASE_URL]
  );

  useEffect(() => dispatch({ type: SessionActionType.RESTORE }), [dispatch]);

  return <RouterProvider router={router} />;
};
