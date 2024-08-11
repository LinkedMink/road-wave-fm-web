import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@linkedmink/road-wave-fm-rpc";

export const trpc = createTRPCReact<AppRouter>();
