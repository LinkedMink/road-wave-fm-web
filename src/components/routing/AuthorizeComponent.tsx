import { FunctionComponent, useContext } from "react";
import { SessionContext } from "../../providers/SessionProvider";
import { Navigate, Outlet } from "react-router";

export const AuthorizeComponent: FunctionComponent = () => {
  const [session] = useContext(SessionContext);
  if (!session.jwtToken) {
    return <Navigate to={"login"} />;
  }

  return <Outlet />;
};
