import { FunctionComponent, useContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SessionActionType } from "../definitions/actionConstants";
import { SessionContext } from "../providers/SessionProvider";
import { RootLayout } from "./layout/RootLayout";
import { AboutPage } from "./pages/AboutPage";
import { LoginPage } from "./pages/LoginPage";
import { LogoutComponent } from "./pages/LogoutComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "documents/:documentName",
        lazy: () => import("../routes/documentsRouteObject").then(m => m.documentsRouteObject),
      },
      {
        index: true,
        path: "login",
        element: <LoginPage />,
      },

      {
        path: "logout",
        element: <LogoutComponent />,
      },
    ],
  },
]);

export const App: FunctionComponent = () => {
  const [_, dispatch] = useContext(SessionContext);

  useEffect(() => dispatch({ type: SessionActionType.RESTORE }), []);

  return <RouterProvider router={router} />;
};
