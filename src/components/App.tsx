import { FunctionComponent, useContext, useEffect, useMemo } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { SessionActionType } from "../definitions/sharedConstants";
import { SessionContext } from "../providers/SessionProvider";
import { AuthorizeComponent } from "./routing/AuthorizeComponent";
import { RootErrorBoundary } from "./routing/BootstrapErrorBoundary";
import { BootstrapLayout } from "./routing/BootstrapLayout";
import { BootstrapStyles } from "./routing/BootstrapStyles";
import { LoadingBackdrop } from "./styled/LoadingBackdrop";

export const App: FunctionComponent = () => {
  const [_, dispatch] = useContext(SessionContext);

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          lazy: () => import("../routes/rootRouteObject").then(m => m.rootRouteObject),
          errorElement: (
            <BootstrapLayout>
              <RootErrorBoundary />
            </BootstrapLayout>
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
                      path: "stations",
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
                    import("../routes/loginRouteObjects").then(
                      m => m.loginRouteObjects.loginSubmit
                    ),
                },
              ],
            },
            {
              path: "/login/ethereum",
              lazy: () =>
                import("../routes/loginEthereumRouteObjects").then(
                  m => m.loginEthereumRouteObjects.page
                ),
              children: [
                {
                  path: "init",
                  lazy: () =>
                    import("../routes/loginEthereumRouteObjects").then(
                      m => m.loginEthereumRouteObjects.init
                    ),
                },
                {
                  path: "submit",
                  lazy: () =>
                    import("../routes/loginEthereumRouteObjects").then(
                      m => m.loginEthereumRouteObjects.submit
                    ),
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
    []
  );

  useEffect(() => dispatch({ type: SessionActionType.RESTORE }), [dispatch]);

  return (
    <BootstrapStyles>
      <RouterProvider
        router={router}
        fallbackElement={
          <BootstrapLayout>
            <LoadingBackdrop isLoading={true} />
          </BootstrapLayout>
        }
        future={{ v7_startTransition: true }}
      />
    </BootstrapStyles>
  );
};
