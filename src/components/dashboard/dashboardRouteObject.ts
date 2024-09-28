import { LoaderFunction } from "react-router";
import { FormatsListCard } from "./FormatsListCard";
import { MapDashboard } from "./MapDashboard";
import { StationsListCard } from "./StationsListCard";
import { fetchAuthClient } from "../../functions/fetchAuthClient";
import type { LazyRouteObject } from "../../types/reactUtilityTypes";

const fetchStationsLoader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  if (!url.searchParams.get("lat") || !url.searchParams.get("lng")) {
    return null;
  }

  const input = {
    longitude: Number(url.searchParams.get("lng")),
    latitude: Number(url.searchParams.get("lat")),
    formatIds: url.searchParams.getAll("fmt").map(Number),
  };

  const encodedInput = encodeURIComponent(JSON.stringify(input));

  return fetchAuthClient("/api/data/station.byDistance?input=" + encodedInput, {
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
    loader: fetchStationsLoader,
  },
};
