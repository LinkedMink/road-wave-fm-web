import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink } from "@trpc/client";
import { FunctionComponent, useContext, useMemo, useState } from "react";
import { ConfigContext } from "../environments/ConfigContext";
import { trpc } from "../hooks/trpc";
import { HasChildrenProps } from "../types/reactUtilityTypes";
import { SessionContext } from "./SessionProvider";

export const AuthClientProvider: FunctionComponent<HasChildrenProps> = props => {
  const config = useContext(ConfigContext);
  const [session] = useContext(SessionContext);
  const [queryClient] = useState(() => new QueryClient());
  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          httpLink({
            url: config.ROAD_WAVE_API_BASE_URL,
            headers: {
              authorization: `Bearer ${session.jwtToken}`,
            },
          }),
        ],
      }),
    [config.ROAD_WAVE_API_BASE_URL, session.jwtToken]
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
