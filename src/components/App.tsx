import { FunctionComponent, useContext, useEffect, useMemo } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { SessionActionType } from "../definitions/sharedConstants";
import { SessionContext } from "./shared/SessionProvider";
import { AuthorizeComponent } from "./bootstrap/AuthorizeComponent";
import { BootstrapLayout } from "./bootstrap/BootstrapLayout";
import { BootstrapStyles } from "./bootstrap/BootstrapStyles";
import { RootErrorBoundary } from "./bootstrap/RootErrorBoundary";
import { LoadingBackdrop } from "./shared/LoadingBackdrop";

export const App: FunctionComponent = () => {
  const [_, dispatch] = useContext(SessionContext);

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          lazy: () => import("./root/rootRouteObject").then(m => m.rootRouteObject),
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
                    import("./dashboard/dashboardRouteObject").then(
                      m => m.dashboardRouteObject.root
                    ),
                  children: [
                    {
                      path: "",
                      lazy: () =>
                        import("./dashboard/dashboardRouteObject").then(
                          m => m.dashboardRouteObject.stations
                        ),
                    },
                    {
                      path: "stations",
                      lazy: () =>
                        import("./dashboard/dashboardRouteObject").then(
                          m => m.dashboardRouteObject.stations
                        ),
                    },
                    {
                      path: "formats",
                      lazy: () =>
                        import("./dashboard/dashboardRouteObject").then(
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
                    import("./account/accountRouteObjects").then(
                      m => m.accountRouteObjects.account
                    ),
                },
              ],
            },
            {
              path: "/about",
              lazy: () => import("./info/infoRouteObject").then(m => m.infoRouteObjects.about),
            },
            {
              path: "/documents",
              lazy: () => import("./info/infoRouteObject").then(m => m.infoRouteObjects.documents),
              children: [
                {
                  path: "license",
                  lazy: () =>
                    import("./info/infoRouteObject").then(m => m.infoRouteObjects.license),
                },
                {
                  path: "privacy-policy",
                  lazy: () =>
                    import("./info/infoRouteObject").then(m => m.infoRouteObjects.privacyPolicy),
                },
              ],
            },
            {
              path: "/login",
              lazy: () => import("./login/loginRouteObjects").then(m => m.loginRouteObjects.login),
              children: [
                {
                  path: "submit",
                  lazy: () =>
                    import("./login/loginRouteObjects").then(m => m.loginRouteObjects.loginSubmit),
                },
              ],
            },
            {
              path: "/login/ethereum",
              lazy: () =>
                import("./login/ethereum/loginEthereumRouteObjects").then(
                  m => m.loginEthereumRouteObjects.page
                ),
              children: [
                {
                  path: "init",
                  lazy: () =>
                    import("./login/ethereum/loginEthereumRouteObjects").then(
                      m => m.loginEthereumRouteObjects.init
                    ),
                },
                {
                  path: "submit",
                  lazy: () =>
                    import("./login/ethereum/loginEthereumRouteObjects").then(
                      m => m.loginEthereumRouteObjects.submit
                    ),
                },
              ],
            },
            {
              path: "/logout",
              lazy: () =>
                import("./account/accountRouteObjects").then(m => m.accountRouteObjects.logout),
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

  useEffect(() => {
    dispatch({ type: SessionActionType.RESTORE });
  }, [dispatch]);

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
