import { FunctionComponent, useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { SessionActionType } from "../../definitions/actionConstants";
import { SessionContext } from "../../providers/SessionProvider";

export const LogoutComponent: FunctionComponent = () => {
  const [session, dispatch] = useContext(SessionContext);

  useEffect(() => {
    if (session.jwtToken) {
      dispatch({ type: SessionActionType.DESTROY });
    }
  }, [session]);

  if (!session.jwtToken) {
    return (
      <Navigate
        to={"/"}
        replace={true}
      />
    );
  }
};
