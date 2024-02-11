import { FormatsListCard } from "../components/dashboard/FormatsListCard";
import { MapDashboard } from "../components/dashboard/MapDashboard";
import { StationsListCard } from "../components/dashboard/StationsListCard";
import type { LazyRouteObject } from "../types/reactUtilityTypes";

export const dashboardRouteObject: Record<"root" | "formats" | "stations", LazyRouteObject> = {
  root: {
    Component: MapDashboard,
  },
  formats: {
    Component: FormatsListCard,
  },
  stations: {
    Component: StationsListCard,
  },
};
