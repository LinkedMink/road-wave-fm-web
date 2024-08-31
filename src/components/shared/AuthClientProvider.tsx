import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink } from "@trpc/client";
import { FunctionComponent, useContext, useMemo, useState } from "react";
import { trpc } from "../../hooks/trpc";
import { HasChildrenProps } from "../../types/reactUtilityTypes";
import { SessionContext } from "./SessionProvider";

export const AuthClientProvider: FunctionComponent<HasChildrenProps> = props => {
  const [session] = useContext(SessionContext);
  const [queryClient] = useState(() => new QueryClient());
  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          httpLink({
            url: "/api/data/",
            headers: {
              authorization: `Bearer ${session.jwtToken}`,
            },
          }),
        ],
      }),
    [session.jwtToken]
  );

  return (
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient}
    >
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </trpc.Provider>
  );
};
