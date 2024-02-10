import { FunctionComponent, useContext } from "react";
import { Navigate } from "react-router";
import { SessionActionType } from "../../definitions/actionConstants";
import { SessionContext } from "../../providers/SessionProvider";

export const LogoutComponent: FunctionComponent = () => {
  const [session, dispatch] = useContext(SessionContext);

  if (session.jwtToken) {
    dispatch({ type: SessionActionType.DESTROY });
  }

  return (
    <Navigate
      to={"/"}
      replace={true}
    />
  );
};
