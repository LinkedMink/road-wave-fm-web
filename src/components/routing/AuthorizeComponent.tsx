import { FunctionComponent, useContext } from "react";
import { SessionContext } from "../../providers/SessionProvider";
import { Navigate } from "react-router";
import { HasChildrenProps } from "../../types/reactUtilityTypes";

export const AuthorizeComponent: FunctionComponent<HasChildrenProps> = props => {
  const [session] = useContext(SessionContext);
  if (!session.jwtToken) {
    return <Navigate to={"login"} />;
  }

  return props.children;
};
