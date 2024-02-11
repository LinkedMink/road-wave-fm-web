import type { ReactNode } from "react";
import type { ActionFunction, LazyRouteFunction, RouteObject } from "react-router";
import type { Simplify } from "type-fest";

export type LazyRouteObject = Simplify<Awaited<ReturnType<LazyRouteFunction<RouteObject>>>> & {
  actionConstructor?: (baseUrl: string) => ActionFunction;
};

export interface HasChildrenProps {
  children: ReactNode;
}
