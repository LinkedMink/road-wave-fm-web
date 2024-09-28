import { FunctionComponent, useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { SessionContext } from "../shared/SessionProvider";

export const AuthorizeComponent: FunctionComponent = () => {
  const [session] = useContext(SessionContext);
  if (!session.jwtToken) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};
