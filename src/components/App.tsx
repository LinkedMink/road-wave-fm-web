import { FunctionComponent, useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import { AboutPage } from "./pages/AboutPage";
import { SessionContext } from "../providers/SessionProvider";
import { SessionActionType } from "../reducers/SessionReducer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/documents/:documentName",
        lazy: () => import("./documentsRouteObject").then(m => m.documentsRouteObject),
      },
    ],
  },
]);

export const App: FunctionComponent = () => {
  const [_, dispatch] = useContext(SessionContext);

  useEffect(() => dispatch({ type: SessionActionType.RESTORE }), []);

  return <RouterProvider router={router} />;
};
