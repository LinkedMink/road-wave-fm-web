import { LoaderFunction } from "react-router";
import { FormatsListCard } from "../components/dashboard/FormatsListCard";
import { MapDashboard } from "../components/dashboard/MapDashboard";
import { StationsListCard } from "../components/dashboard/StationsListCard";
import type { LazyRouteObject } from "../types/reactUtilityTypes";
import { fetchAuthClient } from "../functions/fetchAuthClient";

const fetchStationsLoader =
  (baseUrl: string): LoaderFunction =>
  ({ request }) => {
    const url = new URL(request.url);
    if (!url.searchParams.get("lat") || !url.searchParams.get("lng")) {
      return null;
    }

    const input = {
      longitude: url.searchParams.get("lng"),
      latitude: url.searchParams.get("lat"),
      formatIds: url.searchParams.getAll("fmt"),
    };

    const encodedInput = encodeURIComponent(JSON.stringify(input));

    return fetchAuthClient(new URL("station.byDistance?input=" + encodedInput, baseUrl), {
      method: request.method,
    });
  };

export const dashboardRouteObject: Record<"root" | "formats" | "stations", LazyRouteObject> = {
  root: {
    Component: MapDashboard,
  },
  formats: {
    Component: FormatsListCard,
  },
  stations: {
    Component: StationsListCard,
    loaderConstructor: fetchStationsLoader,
  },
};
