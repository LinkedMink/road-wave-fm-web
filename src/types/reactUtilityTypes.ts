import type { ReactNode } from "react";
import type { ActionFunction, LazyRouteFunction, LoaderFunction, RouteObject } from "react-router";
import type { Simplify } from "type-fest";

export type LazyRouteObject = Simplify<Awaited<ReturnType<LazyRouteFunction<RouteObject>>>> & {
  actionConstructor?: (baseUrl: string) => ActionFunction;
  loaderConstructor?: (baseUrl: string) => LoaderFunction;
};

export interface HasChildrenProps {
  children: ReactNode;
}
