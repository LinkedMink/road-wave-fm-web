import type { ReactNode } from "react";
import type { LazyRouteFunction, RouteObject } from "react-router";
import type { Simplify } from "type-fest";

export type LazyRouteObject = Simplify<Awaited<ReturnType<LazyRouteFunction<RouteObject>>>>;

export interface InitializedProviderProps {
  children: ReactNode;
}
