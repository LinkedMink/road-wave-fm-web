import { LoaderFunction } from "react-router";
import { FormatsListCard } from "../components/dashboard/FormatsListCard";
import { MapDashboard } from "../components/dashboard/MapDashboard";
import { StationsListCard } from "../components/dashboard/StationsListCard";
import type { LazyRouteObject } from "../types/reactUtilityTypes";
import { fetchAuthClient } from "../functions/fetchAuthClient";

const fetchStationsLoader =
  (baseUrl: string): LoaderFunction =>
  async ({ request }) => {
    const url = new URL(request.url);
    if (!url.searchParams.get("lat") || !url.searchParams.get("lng")) {
      return null;
    }

    const response = await fetchAuthClient(new URL("stations" + url.search, baseUrl), {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response;
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
